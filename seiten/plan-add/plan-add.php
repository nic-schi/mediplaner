<div class="container">
    <a href="#plan" class="back">
        <button class="small">
            <img alt="Pfeil links" src="images/icons/arrow-left.svg"/>
            Zurück zum Plan
        </button>
    </a>

    <h1>Eintrag hinzufügen</h1>

    <hr />

    <form id="plan-add-formular">
        <div class="row">
            <div class="col">
                <div class="input-group">
                    <select id="day" name="day">
                        <option value="_none">-- Auswählen --</option>
                    </select>
                    <label for="day">Tag</label>
                    <div class="feedback"></div>
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                    <select id="time" name="time">
                        <option value="_none">-- Auswählen --</option>
                    </select>
                    <label for="time">Zeitpunkt</label>
                    <div class="feedback"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="input-group">
                    <input id="amount" name="amount" min="1" step="1" value="1" placeholder="Menge/Anzahl" type="number" />
                    <label for="amount">Menge/Anzahl</label>
                    <div class="feedback"></div>
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                    <select id="unit" name="unit">
                        <option value="_none">-- Auswählen --</option>
                    </select>
                    <label for="unit">Einheit</label>
                    <div class="feedback"></div>
                </div>
            </div>
        </div>

        <div class="input-group">
            <input id="name" name="name" placeholder="Bezeichnung" type="text" />
            <label for="name">Bezeichnung</label>
            <div class="feedback"></div>
        </div>

        <hr />

        <div class="feedback"></div>

        <button type="submit">Abpeichern</button>
    </form>
</div>
