<div class="container">
    <a href="#plan" class="back">
        <button class="small">
            <img alt="Pfeil links" src="images/icons/arrow-left.svg"/>
            Zurück zum Plan
        </button>
    </a>

    <h1>Einträge bearbeiten</h1>

    <hr />

    <table class="metadata">
            <tbody>
                <tr>
                    <th>Tag:</th>
                    <td id="day"></td>
                </tr>
                <tr>
                    <th>Zeitpunkt</th>
                    <td id="time"></td>
                </tr>
            </tbody>
        </table>

    <form id="plan-edit-formular">
        <div id="medications">
            <fieldset class="medicament copy">
                <legend>
                    <span class="mediname"></span>
                    
                    <button type="button" class="bad delete-button small">
                        <img alt="Mülleimer" src="images/icons/trashcan.svg" />
                    </button>
                </legend>
                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <input class="amount" name="amount" min="1" step="1" value="1" placeholder="Menge/Anzahl" type="number" />
                            <label class="amount-label">Menge/Anzahl</label>
                            <div class="feedback"></div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <select class="unit" name="unit">
                                <option value="_none">-- Auswählen --</option>
                            </select>
                            <label class="unit-label">Einheit</label>
                            <div class="feedback"></div>
                        </div>
                    </div>
                </div>

                <div class="input-group">
                    <input class="name" name="name" placeholder="Bezeichnung" type="text" />
                    <label class="name-label">Bezeichnung</label>
                    <div class="feedback"></div>
                </div>
            </fieldset>
        </div>

        <hr />

        <div class="feedback"></div>

        <button type="submit">Änderung speichern</button>
    </form>
</div>
