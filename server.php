<?php
$_POST = json_decode(file_get_contents("php://input"), true); // эта функция позволяет на php получить json-данные
echo var_dump($_POST); //Берет те данные, которые пришли с клиента, прверащает их в строку, и показывает их на  клиенте
