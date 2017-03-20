# How to Run server

ถ้าต้องการจะพัฒนาแค่backend
```
mvn clean install
```

แต่หากต้องการพัฒนาตัวfrontend ที่เป็น react
ครั้งแรกเมื่อยังไม่มีnode.jsให้ใช้คำสั่ง
```
mvn clean install -PinstallNode
```
หากมีnode.jsเเล้วสามารถใช้คำสั่ง
```
mvn clean install -Pwebpackwatch
```
เพื่อdev javascript ได้เลย