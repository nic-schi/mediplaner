<?php
    $TITLE = "Mein Plan | Mediplaner";

    require_once "inc/head.php";
    include_once "inc/body.php";
?>

<table class="plan">
    <thead>
        <tr>
            <th></th>
            <th>Montag</th>
            <th>Dienstag</th>
            <th>Mittwoch</th>
            <th>Donnerstag</th>
            <th>Freitag</th>
            <th>Samstag</th>
            <th>Sonntag</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>
                <div class="td-icon">
                    <span class="text">Morgens</span>
                    <img class="icon" src="images/icons/morgens.svg" />
                </div>
            </th>
            <td>Aspirin 20g</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th>
                <div class="td-icon">
                    <span class="text">Mittags</span>
                    <img class="icon" src="images/icons/mittags.svg" />
                </div>
            </th>
            <td></td>
            <td>Insulin 20g</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th>
                <div class="td-icon">
                    <span class="text">Abends</span>
                    <img class="icon" src="images/icons/abends.svg" />
                </div>
            </th>
            <td>Kodein 5g</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>E20 Sprit 90ml</td>
            <td></td>
        </tr>
    </tbody>
</table>

<?php 
    include_once "inc/body-end.php";
?>