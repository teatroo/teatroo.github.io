/* Teatroo: the page that opens from the link in the e-mails of the account (new password, confirm e-mail).
   It talks only to the Google sign-in service (Identity Toolkit) with the browser key of reset-config.js: no other script, no cookies,
   no statistics. The one-time code is read from the address and removed from it at once. Texts: 6 languages, set with textContent only. */
(function (root) {
  'use strict';

  var LANGS = ['en', 'ru', 'de', 'fr', 'es', 'it'];
  var HOST = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  var T = {
    en: {
      kicker: 'Your account', title_reset: 'New password', title_verify: 'Confirm e-mail', loading: 'Checking your link…',
      for_account: 'Create a new password for %s. It is not your e-mail password.', l1: 'New password', l2: 'Repeat the password',
      rules: 'At least 8 characters, with an uppercase letter, a lowercase letter and a digit.', mismatch: 'The two passwords are different.',
      button: 'Save password', saving: 'Saving…',
      done_reset: 'Your password is changed. Open Teatroo and sign in with the new password.',
      done_verify: 'Your e-mail address is confirmed. You can return to the app.',
      err_invalid: 'This link is not valid or was already used. Ask for a new link in the app (Sign in, then Forgot password?).',
      err_expired: 'This link has expired. Ask for a new link in the app (Sign in, then Forgot password?).',
      err_network: 'No connection. Check your internet and try again.',
      err_other: 'Something went wrong. Please try again, or ask for a new link in the app.',
      err_unsupported: 'This link cannot be used here.'
    },
    ru: {
      kicker: 'Ваш аккаунт', title_reset: 'Новый пароль', title_verify: 'Подтверждение e-mail',
      loading: 'Проверяем вашу ссылку…',
      for_account: 'Создайте новый пароль для Teatroo (%s). Это не пароль от вашей почты.',
      l1: 'Новый пароль', l2: 'Повторите пароль',
      rules: 'Не меньше 8 символов, с заглавной буквой, строчной буквой и цифрой.',
      mismatch: 'Два пароля не совпадают.',
      button: 'Сохранить пароль', saving: 'Сохраняем…',
      done_reset: 'Пароль изменён. Откройте Teatroo и войдите с новым паролем.',
      done_verify: 'Ваш e-mail подтверждён. Можно вернуться в приложение.',
      err_invalid: 'Ссылка недействительна или уже была использована. Запросите новую в приложении (Вход, затем «Забыли пароль?»).',
      err_expired: 'Срок действия ссылки истёк. Запросите новую в приложении (Вход, затем «Забыли пароль?»).',
      err_network: 'Нет соединения. Проверьте интернет и попробуйте ещё раз.',
      err_other: 'Что-то пошло не так. Попробуйте ещё раз или запросите новую ссылку в приложении.',
      err_unsupported: 'Эту ссылку здесь использовать нельзя.'
    },
    de: {
      kicker: 'Dein Konto', title_reset: 'Neues Passwort', title_verify: 'E-Mail bestätigen', loading: 'Dein Link wird geprüft…',
      for_account: 'Lege ein neues Passwort für Teatroo fest (%s). Es ist nicht das Passwort deines E-Mail-Kontos.', l1: 'Neues Passwort', l2: 'Passwort wiederholen',
      rules: 'Mindestens 8 Zeichen, mit Großbuchstabe, Kleinbuchstabe und Ziffer.', mismatch: 'Die beiden Passwörter sind verschieden.',
      button: 'Passwort speichern', saving: 'Wird gespeichert…',
      done_reset: 'Dein Passwort ist geändert. Öffne Teatroo und melde dich mit dem neuen Passwort an.',
      done_verify: 'Deine E-Mail-Adresse ist bestätigt. Du kannst zur App zurückkehren.',
      err_invalid: 'Dieser Link ist ungültig oder wurde schon benutzt. Fordere in der App einen neuen an (Anmelden, dann Passwort vergessen?).',
      err_expired: 'Dieser Link ist abgelaufen. Fordere in der App einen neuen an (Anmelden, dann Passwort vergessen?).',
      err_network: 'Keine Verbindung. Prüfe dein Internet und versuche es noch einmal.',
      err_other: 'Etwas ist schiefgelaufen. Versuche es noch einmal oder fordere in der App einen neuen Link an.',
      err_unsupported: 'Dieser Link kann hier nicht verwendet werden.'
    },
    fr: {
      kicker: 'Votre compte', title_reset: 'Nouveau mot de passe', title_verify: 'Confirmer l’e-mail', loading: 'Vérification de votre lien…',
      for_account: 'Créez un nouveau mot de passe pour Teatroo (%s). Ce n’est pas le mot de passe de votre messagerie.', l1: 'Nouveau mot de passe', l2: 'Répétez le mot de passe',
      rules: 'Au moins 8 caractères, avec une majuscule, une minuscule et un chiffre.', mismatch: 'Les deux mots de passe sont différents.',
      button: 'Enregistrer le mot de passe', saving: 'Enregistrement…',
      done_reset: 'Votre mot de passe est modifié. Ouvrez Teatroo et connectez-vous avec le nouveau mot de passe.',
      done_verify: 'Votre adresse e-mail est confirmée. Vous pouvez revenir à l’application.',
      err_invalid: 'Ce lien n’est pas valide ou a déjà été utilisé. Demandez-en un nouveau dans l’application (Connexion, puis Mot de passe oublié ?).',
      err_expired: 'Ce lien a expiré. Demandez-en un nouveau dans l’application (Connexion, puis Mot de passe oublié ?).',
      err_network: 'Pas de connexion. Vérifiez votre internet et réessayez.',
      err_other: 'Une erreur s’est produite. Réessayez ou demandez un nouveau lien dans l’application.',
      err_unsupported: 'Ce lien ne peut pas être utilisé ici.'
    },
    es: {
      kicker: 'Tu cuenta', title_reset: 'Nueva contraseña', title_verify: 'Confirmar el e-mail', loading: 'Comprobando tu enlace…',
      for_account: 'Crea una nueva contraseña para Teatroo (%s). No es la contraseña de tu correo.', l1: 'Nueva contraseña', l2: 'Repite la contraseña',
      rules: 'Al menos 8 caracteres, con mayúscula, minúscula y un número.', mismatch: 'Las dos contraseñas son distintas.',
      button: 'Guardar contraseña', saving: 'Guardando…',
      done_reset: 'Tu contraseña ha cambiado. Abre Teatroo e inicia sesión con la nueva contraseña.',
      done_verify: 'Tu dirección de e-mail está confirmada. Puedes volver a la app.',
      err_invalid: 'Este enlace no es válido o ya se ha usado. Pide uno nuevo en la app (Iniciar sesión y luego ¿Olvidaste la contraseña?).',
      err_expired: 'Este enlace ha caducado. Pide uno nuevo en la app (Iniciar sesión y luego ¿Olvidaste la contraseña?).',
      err_network: 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
      err_other: 'Algo salió mal. Inténtalo de nuevo o pide un enlace nuevo en la app.',
      err_unsupported: 'Este enlace no se puede usar aquí.'
    },
    it: {
      kicker: 'Il tuo account', title_reset: 'Nuova password', title_verify: 'Conferma l’e-mail', loading: 'Controllo del tuo link…',
      for_account: 'Crea una nuova password per Teatroo (%s). Non è la password della tua posta.', l1: 'Nuova password', l2: 'Ripeti la password',
      rules: 'Almeno 8 caratteri, con maiuscola, minuscola e un numero.', mismatch: 'Le due password sono diverse.',
      button: 'Salva la password', saving: 'Salvataggio…',
      done_reset: 'La tua password è cambiata. Apri Teatroo e accedi con la nuova password.',
      done_verify: 'Il tuo indirizzo e-mail è confermato. Puoi tornare all’app.',
      err_invalid: 'Questo link non è valido o è già stato usato. Chiedine uno nuovo nell’app (Accedi, poi Password dimenticata?).',
      err_expired: 'Questo link è scaduto. Chiedine uno nuovo nell’app (Accedi, poi Password dimenticata?).',
      err_network: 'Nessuna connessione. Controlla internet e riprova.',
      err_other: 'Qualcosa è andato storto. Riprova o chiedi un nuovo link nell’app.',
      err_unsupported: 'Questo link non può essere usato qui.'
    }
  };

  /** The language of the page: the phone's browser first (the language of the person), then the language of the e-mail, then English. */
  function pickLanguage(browserLanguages, linkLanguage) {
    var list = (browserLanguages || []).concat(linkLanguage ? [linkLanguage] : []);
    for (var i = 0; i < list.length; i++) {
      var primary = String(list[i] || '').toLowerCase().split(/[-_]/)[0];
      if (LANGS.indexOf(primary) >= 0) return primary;
    }
    return 'en';
  }

  function parseParams(search) {
    var out = { mode: '', oobCode: '', lang: '' };
    String(search || '').replace(/^\?/, '').split('&').forEach(function (pair) {
      if (!pair) return;
      var eq = pair.indexOf('=');
      var k = eq < 0 ? pair : pair.slice(0, eq);
      var v = eq < 0 ? '' : pair.slice(eq + 1);
      try { v = decodeURIComponent(v.replace(/\+/g, ' ')); } catch (e) { v = ''; }
      if (k === 'mode') out.mode = v;
      else if (k === 'oobCode') out.oobCode = v;
      else if (k === 'lang') out.lang = v;
    });
    return out;
  }

  /** The same rule as in the app: at least 8 characters, an uppercase letter, a lowercase letter and a digit. */
  function passwordIsStrong(pw) {
    return typeof pw === 'string' && pw.length >= 8 && /\p{Lu}/u.test(pw) && /\p{Ll}/u.test(pw) && /\d/.test(pw);
  }

  /** Maps the error code of the service to the key of a text. */
  function errorKey(code) {
    var c = String(code || '');
    if (c.indexOf('INVALID_OOB_CODE') === 0) return 'err_invalid';
    if (c.indexOf('EXPIRED_OOB_CODE') === 0) return 'err_expired';
    if (c.indexOf('NETWORK') === 0) return 'err_network';
    if (c.indexOf('WEAK_PASSWORD') === 0) return 'rules';
    return 'err_other';
  }

  function post(fetchFn, key, method, body) {
    var url = HOST + method + '?key=' + encodeURIComponent(key);
    return fetchFn(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      referrerPolicy: 'strict-origin', credentials: 'omit', cache: 'no-store'
    }).then(function (r) {
      return r.json().then(function (j) {
        if (r.ok) return j;
        throw { code: (j && j.error && j.error.message) || 'UNKNOWN' };
      });
    }, function () { throw { code: 'NETWORK' }; });
  }

  /** env: search, languages, fetch, clearUrl(), document, key. Everything the page needs comes in here, so the logic can be tested. */
  function start(env) {
    var doc = env.document;
    var params = parseParams(env.search);
    var lang = pickLanguage(env.languages, params.lang);
    var t = T[lang];
    function el(id) { return doc.getElementById(id); }
    function say(text) { el('r-msg').textContent = text; el('r-msg').hidden = false; }
    function showError(key) { say(t[key] || t.err_other); el('r-form').hidden = true; }
    if (doc.documentElement) doc.documentElement.lang = lang;
    if (env.clearUrl) env.clearUrl();   // the one-time code must not stay in the address bar or in the history

    var reset = params.mode === 'resetPassword';
    var verify = params.mode === 'verifyEmail';
    var title = reset ? t.title_reset : verify ? t.title_verify : t.kicker;
    el('r-kicker').textContent = t.kicker;
    el('r-title').textContent = title;
    doc.title = title + ': Teatroo';
    el('r-l1').textContent = t.l1; el('r-l2').textContent = t.l2; el('r-rules').textContent = t.rules; el('r-btn').textContent = t.button;
    say(t.loading);

    if (!reset && !verify) return showError('err_unsupported');
    if (!params.oobCode) return showError('err_invalid');
    if (!env.key) return showError('err_other');   // the browser key is not set yet (reset-config.js)

    if (verify) {
      return post(env.fetch, env.key, 'update', { oobCode: params.oobCode }).then(function () {
        say(t.done_verify);
      }, function (e) { showError(errorKey(e && e.code)); });
    }

    return post(env.fetch, env.key, 'resetPassword', { oobCode: params.oobCode }).then(function (info) {
      var parts = t.for_account.split('%s');
      el('r-for').textContent = parts[0] + (info && info.email ? info.email : '') + (parts[1] || '');
      el('r-msg').hidden = true;
      el('r-form').hidden = false;
      el('r-form').onsubmit = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        var pw = el('r-pw').value, pw2 = el('r-pw2').value, err = el('r-err');
        err.hidden = true;
        if (!passwordIsStrong(pw)) { err.textContent = t.rules; err.hidden = false; return false; }
        if (pw !== pw2) { err.textContent = t.mismatch; err.hidden = false; return false; }
        el('r-btn').disabled = true; el('r-btn').textContent = t.saving;
        post(env.fetch, env.key, 'resetPassword', { oobCode: params.oobCode, newPassword: pw }).then(function () {
          el('r-form').hidden = true;
          say(t.done_reset);
        }, function (e) {
          el('r-btn').disabled = false; el('r-btn').textContent = t.button;
          var k = errorKey(e && e.code);
          if (k === 'err_invalid' || k === 'err_expired') return showError(k);
          err.textContent = t[k] || t.err_other; err.hidden = false;
        });
        return false;
      };
    }, function (e) { showError(errorKey(e && e.code)); });
  }

  var api = { LANGS: LANGS, T: T, pickLanguage: pickLanguage, parseParams: parseParams, passwordIsStrong: passwordIsStrong, errorKey: errorKey, start: start };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TeatrooReset = api;

  if (root.document && root.location && root.fetch && root.document.getElementById('r-form')) {
    start({
      search: root.location.search,
      languages: root.navigator && (root.navigator.languages || [root.navigator.language]),
      fetch: root.fetch.bind(root),
      clearUrl: function () { try { root.history.replaceState(null, '', root.location.pathname); } catch (e) {} },
      document: root.document,
      key: root.TEATROO_RESET_KEY
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
