*** Settings ***
Library           Selenium2Library
Test Setup        Start browser
Test Teardown     Close All Browsers

*** Variables ***
${TESTADDRESS}   https://www.youtube.com/
${BROWSER}       chrome
${FIVESECOND}    5.0
${TENSECOND}     10.0

*** Keywords ***
Start browser
    Open Browser    ${TESTADDRESS}    ${BROWSER}
    Maximize Browser Window
Check rick roll
    Set Selenium Speed    3.0
    Wait Until Page Contains Element    tag=video    ${TENSECOND}
    Page Should Contain    Rick Astley - Never Gonna Give You Up
    Page Should Contain    RickAstleyVEVO

*** Test Cases ***
ทดสอบค้นหาเพลง never gonna give you up ด้วยการค้นหาแบบเต็มคำ
    Input Text    masthead-search-term    never gonna give you up
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Click Link     link=Rick Astley - Never Gonna Give You Up
    Check rick roll

ทดสอบค้นหาเพลง never gonna give you up ด้วยการค้นหาแบบไม่เต็มคำ
    Input Text    masthead-search-term    never gonna
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Click Link     link=Rick Astley - Never Gonna Give You Up
    Check rick roll

ทดสอบค้นหาเพลง never gonna give you up โดยหาจากชื่อศิลปิน
    Input Text    masthead-search-term    Rick Astley
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Click Link     link=Rick Astley - Never Gonna Give You Up
    Check rick roll