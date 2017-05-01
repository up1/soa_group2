*** Settings ***
Library           Selenium2Library
Test Setup        Start Browser
Test Teardown     Close All Browsers

*** Variables ***
${TESTADDRESS}   https://www.youtube.com/
${BROWSER}       chrome
${TWOSECOUND}    2.0
${FIVESECOND}    5.0
${TENSECOND}     10.0

*** Keywords ***
Start Browser
    Open Browser    ${TESTADDRESS}    ${BROWSER}
    Maximize Browser Window
Check Rick Roll
    Wait Until Page Contains Element    tag=video    ${TENSECOND}
    Sleep     ${TENSECOND}
    Page Should Contain    Rick Astley - Never Gonna Give You Up
    Page Should Contain    RickAstleyVEVO

*** Test Cases ***
ทดสอบค้นหาเพลง never gonna give you up ด้วยการค้นหาแบบเต็มคำ
    Input Text    masthead-search-term    never gonna give you up
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Wait Until Page Contains Element    link=Rick Astley - Never Gonna Give You Up
    Click Link     link=Rick Astley - Never Gonna Give You Up
    Check Rick Roll

ทดสอบค้นหาเพลง never gonna give you up ด้วยการค้นหาแบบไม่เต็มคำ
    Input Text    masthead-search-term    never gonna
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Wait Until Page Contains Element    link=Rick Astley - Never Gonna Give You Up
    Click Link     link=Rick Astley - Never Gonna Give You Up
    Check Rick Roll

ทดสอบค้นหาเพลง never gonna give you up โดยหาจากชื่อศิลปิน
    Input Text    masthead-search-term    Rick Astley
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Wait Until Page Contains Element    link=Rick Astley - Never Gonna Give You Up
    Click Link    link=Rick Astley - Never Gonna Give You Up
    Check Rick Roll

ทดสอบค้นหาเพลง never gonna give you up โดยหาจาก คำว่า rick roll
    Input Text    masthead-search-term    rick roll
    Click Button    xpath=//*[@id="search-btn"]
    Wait Until Page Contains    Rick Astley    ${FIVESECOND}
    Wait Until Page Contains Element    link=Rick Astley - Never Gonna Give You Up
    Page Should Contain    rick roll
    Click Link    link=Rick Astley - Never Gonna Give You Up
    Check Rick Roll