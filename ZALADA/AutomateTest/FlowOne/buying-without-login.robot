*** Settings ***
Library           Selenium2Library

*** Variables ***
${TESTADDRESS}   http://localhost:9000/
${BROWSER}       chrome
${TWOSECOUND}    2.0
${FIVESECOND}    5.0
${TENSECOND}     10.0
${CART}          document.links[2]

*** Keywords ***
Start Browser
    Open Browser    ${TESTADDRESS}    ${BROWSER}
    Maximize Browser Window
Assure Is Zalada Real Site
    Page Should Contain Image    id=brand-image
    Wait Until Page Contains    ประเภทสินค้า    ${FIVESECOND}
    Page Should Contain    รายการสินค้าแนะนำ
    Page Should Contain    ขอบคุณโปรแกรมเมอร์ทุกคนที่เขียนโค๊ดอย่างบ้าคลั่ง
    Page Should Contain    การออกแบบเป็นชีวิตจิตใจของพวกเขา
    Page Should Not Contain    Lazada
    Page Should Not Contain    lazada
    Page Should Not Contain    ลาซาด้า

*** Test Cases ***
#Test case ทั้งหมดนั้นจะทำการเข้าเว็บโดยไม่ได้ล็อกอิน
ทดสอบซื้อสินค้าหนึ่งชิ้นแบบปกติ ผ่านปุ่ม Add to cart ในหน้าแรก
    Start Browser
    Assure Is Zalada Real Site
    Click Link    dom=document.links[6]
    Wait Until Page Contains    เพิ่มสินค้าเข้าสู่ตะกร้าเรียบร้อยแล้ว    ${FIVESECOND}
    Wait Until Page Does Not Contain    เพิ่มสินค้าเข้าสู่ตะกร้าเรียบร้อยแล้ว    ${TENSECOND}
    Mouse Over    dom=${CART}
    Mouse Down On Link    dom=${CART}

