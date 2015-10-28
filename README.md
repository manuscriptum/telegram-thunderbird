# telegram-thunderbird
A Thunderbird chat protocoll extension for telegram.org


### Development:
    git clone https://github.com/Mattze96/telegram-thunderbird

Using thunderbird with the Extension Auto-Installer allows you to auto-reload changes.

    thunderbird --new-instance -P "dev"

Compile to .xpi file

    make all

Compile and autoreload Addon in a running thunderbird instance

    make install


### TODO:
I plan to implement the library from here: https://github.com/zhukov/webogram

Started with the function "sendCode"
Now on MtpApiManager

Current file:
mtproto_wrapper.jsm
-ng_utils.jsm
Current error:
Storage.get is not a function.

### Usefull links:
http://telegram.org/api
