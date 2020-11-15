'use strict';

(function($) {
    $(document).ready(function() {

        let alerts = {
                emptyUsername: 'Please, fill Username first',
                yourPassword: 'Your password is ',
                emptyFields: 'Please fill all fields to proceed authorization :)',
                noUsername: 'There is no user with such Username found. Please, try again.',
                wrongPassword: 'Your password is wrong. Please, try again.'
            },
            users = [
                {
                    name: 'Admin',
                    password: 'Qwerty'
                },
                {
                    name: 'Batman',
                    password: 'Joker'
                }
            ];
        
        // Show password
        $('.login__show-pass').click(function() {
            let field = $(this).parents('.login__block').find('.login__field');

            field.attr('type', 'text');

            setTimeout(() => {
                field.attr('type', 'password');
            }, 1000);
        });
        
        // Forget your password
        $('.login__forgot').mouseenter(function() {
            let username = $('#username').val(),
                message,
                rightUser = findUser(username);

            if (rightUser) {
                message = `${alerts.yourPassword} <b>${rightUser.password}</b>`;
            } else {
                message = alerts.emptyUsername;
            }

            $(this).append(`<span>${message}</span>`);
        });

        $('.login__forgot').mouseleave(function() {
            $(this).find('span').remove();
        });

        /*document.querySelector('.login__button').addEventListener('click', () => {
            document.body.className = 'success';
        });*/

        // Validate user
        $('.login__button').click(function() {
            let username = $('#username').val(),
                password = $('#password').val(),
                rightUser = findUser(username);

            $('.login__error').remove();
            $('.login__block').removeClass('invalid');

            if (username === '' || password === '') {
                showWarningMessage(alerts.emptyFields);
                return;
            }

            if (!rightUser) {
                generateError('#username', alerts.noUsername);

                return;
            }

            if (rightUser.password === password) {
                $('body').addClass('success');
            } else {
                generateError('#password', alerts.wrongPassword);
            }
        });

        // Functions
        function findUser(userName) {
            let user;

            $.each(users, (i, item) => {
                if (item.name == userName) {
                    user = item;
                    return;
                }
            })

            return user;
        }

        function generateError(item, message) {
            let span = document.createElement('span');

            $(span).addClass('login__error').text(message);
            $(span).insertAfter(item);

            $(item).parents('.login__block').addClass('invalid');
        }

        function showWarningMessage(message) {
            $('<div/>').addClass('dialog-overlay')
                       .appendTo('body');

            $('<div/>').addClass('dialog')
                       .html(`<p>${message}</p>`)
                       .appendTo('body');

            setTimeout(() => {
                $('.dialog, .dialog-overlay').remove();
            }, 2000);
        }

    });
})(jQuery);