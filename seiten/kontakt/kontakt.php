<div class="container">
    <h1>Kontakt</h1>

    <hr />

    <form id="kontakt-formular">
        <div class="input-group">
            <input id="email" name="email" required placeholder="E-Mail-Adresse" type="email" />
            <label for="email">E-Mail-Adresse</label>
            <div class="feedback"></div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group">
                    <input id="vname" name="vname" required placeholder="Vorname" type="text" />
                    <label for="vname">Vorname</label>
                    <div class="feedback"></div>
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                    <input id="name" name="name" required placeholder="Nachname" type="text" />
                    <label for="name">Nachname</label>
                    <div class="feedback"></div>
                </div>
            </div>
        </div>

        <div class="input-group">
            <textarea id="text" name="text" rows="7" required placeholder="Ihre Nachricht"></textarea>
            <label for="text">Ihre Nachricht</label>
            <div class="feedback"></div>
        </div>

        <hr />

        <div class="feedback"></div>

        <button type="submit">Kontaktanfrage absenden</button>
    </form>
</div>
