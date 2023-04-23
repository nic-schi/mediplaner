<div class="container">
    <h1>Ihre Profildaten</h1>

    <hr />

    <form id="profil-formular">
        <div class="input-group">
            <input id="username" readonly name="username" placeholder="Benutzername" type="text" />
            <label for="username">Benutzername</label>
        </div>

        <div class="input-group">
            <input id="email" readonly name="email" placeholder="E-Mail-Adresse" type="email" />
            <label for="email">E-Mail-Adresse</label>
        </div>

        <div class="feedback"></div>

        <div id="delete-acc-confirm" class="confirm-wrapper">
            <button class="bad original small" id="delete-acc" type="button">Benutzerkonto löschen</button>
            <div class="confirm-container">
                <p class="text">
                    <b>Sind Sie sicher?</b><br/>
                    Ihr Benutzerkonto wird endgültig gelöscht und kann nicht wiederhergestellt werden.
                </p>
                <div class="buttons">
                    <button type="button" class="small confirm">Ja, ich bin sicher</button>
                    <button type="button" class="small abort">Abbrechen</button>
                </div>
            </div>
        </div>
    </form>

        
</div>
