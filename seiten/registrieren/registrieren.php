<div class="container">
    <h1>Registrieren</h1>

    <hr />

    <form id="registrieren-formular">
        <div class="input-group">
            <input id="username" name="username" value="test.user" placeholder="Benutzername" value="" type="text" />
            <label for="username">Benutzername</label>
            <div class="feedback"></div>
        </div>

        <div class="input-group">
            <input id="email" name="email" value="nichlas@email.de" placeholder="E-Mail-Adresse" value="" type="text" />
            <label for="email">E-Mail-Adresse</label>
            <div class="feedback"></div>
        </div>

        <div class="input-group">
            <input id="password" name="password" value="password" placeholder="Passwort" type="password" />
            <label for="password">Passwort</label>
            <div class="feedback"></div>
        </div>

        <div class="input-group">
            <input id="password-repeat" name="password-repeat" value="password" placeholder="Passwort wiederholen" type="password" />
            <label for="password-repeat">Passwort wiederholen</label>
            <div class="feedback"></div>
        </div>

        <hr />

        <div class="feedback"></div>

        <button type="submit">Registrieren</button>
    </form>
</div>