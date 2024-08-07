@viteReactRefresh
@vite(['resources/css/app.scss', 'resources/js/Contacts.jsx'])
    <!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Contacts</title>
    </head>
    <body>
        <div class="modal fade" id="modal_contatos" tabindex="-1" aria-labelledby="titulo_modal_contato"
             aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="titulo_modal_contato">Contact Detail</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="div_modal_contatos"></div>
                </div>
            </div>
        </div>
        <div id="root"></div>
    </body>
</html>
