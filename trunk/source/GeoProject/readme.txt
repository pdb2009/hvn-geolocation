1. Setup service
- Download Yii framework at http://www.yiiframework.com/
- Download wamp at http://www.wampserver.com/en/download.php
- Install wamp
- Extract Yii framework to folder www of Wamp
- Extract Gapp service to folder www of wamp
- Access to Gapp service by these link:
+ http://localhost/gapp/index.php/api/category => return a category list
+ http://localhost/gapp/index.php/api/category/' + catid => return a category by id
+ http://localhost/gapp/index.php/api/item' => return a place list
+ http://localhost/gapp/index.php/api/item/category/' + catid => return a place list of a category by id

2. Gapp project
- Extract Gapp project and open by Eclipse