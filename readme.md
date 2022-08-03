# Rish inc. WordPress Themes for Websites

URL: https://rish.style

## Deploy Github Actions

# Use Plugin
- contact-form-7
- ewww-image-optimizer
- mw-wp-form
- mw-wp-form-captcha
- regenerate-thumbnails
- Flamingo
- rest-api
- rish-custom-post - Rish original plugin
- smart-custom-fields
- theme-check
- wp-multibyte-patch

## Command

gulp 起動
```
gulp --path="proxy URL"
```
proxy URL = Local By FlyWheel で指定している URL

Styleguide 起動
```
gulp styleguide or npm run styleguide
```

## Styleguide make files

1. command
    ```
    gulp styleguide
    ```
2. ```src/styluguide/components/``` or ```src/styluguide/projects/``` make ```directoryname.hbs```( for html file ) and ```readme.md``` ( for Notes block )
3. ```directoryname.hbs``` add HTML code
4. ```readme.md``` add component discription
5. command
    ```
    gulp styleguide
    ```