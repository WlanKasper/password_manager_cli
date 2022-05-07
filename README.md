# password_manager_cli

## TODO:
    - [x] Создать публичный и приватный ключи RSA. Приватный ключ зашифровать AES.
    - [x] Добавить подтверждение удаления файла.
    - [ ] Добавить автоматические архивирование.
    - [ ] Исправить проверку пароля
    - [ ] Добавить адресс кошелька
    - [ ] Добавить заметку
## How to Use

ПРИ ПЕРВОМ ВХОДЕ ПОЛЬЗОВАТЕЛЬЯ ПОЛЬЗОВАТЕЛЬ ВВОДИТ ПАРОЛЬ, ОН СРАЗУ ШИФРУЕТСЯ И СОХРАНЯТЕТСЯ КУДА-ТО И ПОТОМ ПРОВЕРЯЮТСЯ ЗАШИФРОВАННЫЕ ВЕРСИИ

USAGE  
    $ node index.js <command> [option]

COMMANDS  
    help    Print help info                 
    add     Add new data to storage         
    find    Fins data in storage            
    delete  delete all data from storage    

OPTIONS  
    -c, --clear        Clear the console Default: true           
    --noClear          Don't clear the console Default: false    
    -d, --debug        Print debug info Default: false           
    -v, --version      Print CLI version Default: false          
    -c, --company      Use to input company name Default: false  
    -l, --login        Use to input login Default: false         
    -p, --password     Use to input password Default: false      
    -lk, --link        Use to input company link Default: false  
    -m, --mnemonic     Use to input mnemonic Default: false      
    -r, --restore_key  Use to input restore key Default: false