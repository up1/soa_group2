*** Settings ***
Library           Selenium2Library
Library           AllureReportLibrary    ./superReport

*** Variables ***
${TESTADDRESS}   http://161.246.132.243:5000/
${BROWSER}       chrome
${TWOSECOUND}    2.0
${FIVESECOND}    5.0
${TENSECOND}     10.0
${CART}          document.links[2]
${CHECKOUT}      checkout-btn
${AMOUNT}        25

*** Keywords ***
Start Browser
    Open Browser    ${TESTADDRESS}    ${BROWSER}
    Maximize Browser Window
Restart Test
    Select Window    title=Zalada
    Go To    ${TESTADDRESS}
    Assure Is Zalada Real Site
Add Item Check
    Wait Until Page Contains    เพิ่มสินค้าเข้าสู่ตะกร้าเรียบร้อยแล้ว    ${TENSECOND}
    Wait Until Page Does Not Contain    เพิ่มสินค้าเข้าสู่ตะกร้าเรียบร้อยแล้ว    ${TENSECOND}
Multiple Product Cart Check
    Xpath Should Match X Times    //*[@id="cart-container"]/div/div/table/tbody/tr    5
    Page Should Contain Element    dom=document.getElementsByTagName('tr')[5]
Assure Is Zalada Real Site
    Page Should Contain Image    id=brand-image
    Wait Until Page Contains    ประเภทสินค้า    ${FIVESECOND}
    Page Should Contain    รายการสินค้าแนะนำ
    Page Should Contain    ขอบคุณโปรแกรมเมอร์ทุกคนที่เขียนโค๊ดอย่างบ้าคลั่ง
    Page Should Contain    การออกแบบเป็นชีวิตจิตใจของพวกเขา
    Page Should Not Contain    Lazada
    Page Should Not Contain    lazada
    Page Should Not Contain    ลาซาด้า
Basic Check Cart Page
    Mouse Over    dom=${CART}
    Click Link    dom=${CART}
    Wait Until Page Contains    ตระกร้าสินค้า    ${TENSECOND}
    Wait Until Page Contains Element    css=#cart-container > div > div > table > tbody > tr:nth-child(1)    ${TENSECOND}
    Page Should Contain Image    css=#cart-container > div > div > table > tbody > tr:nth-child(1) > td.col-sm-8.col-md-6 > div > a > img
    Page Should Contain    Quantity
    Page Should Contain    Price
    Page Should Contain    Total
Checkout The Cart
    Sleep    ${FIVESECOND}
    Page Should Contain Button    id=${CHECKOUT}
    Click Button    id=${CHECKOUT}
    Input Text    name=name    พลเอกประยงค์ จันทร์ชงชา อังคารชงกาแฟ
    Input Text    name=tel    0893693696
    Input Text    name=email    prayong.1111@thaigov.go.th
    Input Text    name=address    เลขที่ 1 ถนนพิษณุโลก เขตดุสิต แขวงดุสิต กรุงเทพมหานคร 10300
    Input Text    name=post_code    10300
    Input Text    name=state    เขตดุสิต แขวงดุสิต
    Select From List By Value    name=province    กรุงเทพมหานคร
    Page Should Contain Button    css=#form-signup > div > div:nth-child(8) > button
    Click Button    css=#form-signup > div > div:nth-child(8) > button
    Wait Until Page Does Not Contain    ยืนยันการสั่งซื้อ    ${TENSECOND}
    Wait Until Page Contains Element    tag=canvas
    

*** Test Cases ***
#Test case ทั้งหมดนั้นจะทำการเข้าเว็บโดยไม่ได้ล็อกอิน
ทดสอบซื้อสินค้าหนึ่งชิ้นแบบปกติ ผ่านปุ่ม Add to cart ในหน้าแรก
    Start Browser
    Assure Is Zalada Real Site
    Mouse Over    dom=document.links[6]
    Click Link    dom=document.links[6]
    Add Item Check
    Basic Check Cart Page
    Checkout The Cart

ทดสอบซื้อสินค้าหนึ่งชิ้นแบบปกติ โดยกดดูรายละเอียดสินค้าด้วย
    Restart Test
    Click Button    dom=document.getElementsByTagName('button')[9]
    Wait Until Page Contains    รายละเอียด
    Click Button    css=body > div:nth-child(3) > div > div:nth-child(2) > div > button.btn.btn-primary.pull-right
    Add Item Check
    Basic Check Cart Page
    Checkout The Cart

ทดสอบซื้อสินค้าหลายชึ้น ด้วยสินค้าประเภทเดียว
    Restart Test
    Click Button    dom=document.getElementsByTagName('button')[9]
    Wait Until Page Contains    รายละเอียด
    Input Text    name=amount    ${AMOUNT}
    Click Button    css=body > div:nth-child(3) > div > div:nth-child(2) > div > button.btn.btn-primary.pull-right
    Add Item Check
    Basic Check Cart Page   
    Textfield Value Should Be    dom=document.getElementsByTagName('input')[1]    ${AMOUNT}
    Checkout The Cart

ทดสอบซื้อสืนค้ามากกว่าหนึ่งประเภท โดยซื้อสามประเภท ประเภทละหนึ่งชิ้น
    Restart Test
    Click Link    dom=document.links[5]
    Click Link    dom=document.links[6]
    Click Link    dom=document.links[7]
    Add Item Check
    Basic Check Cart Page
    Multiple Product Cart Check
    Checkout The Cart
    [Teardown]    Close Browser