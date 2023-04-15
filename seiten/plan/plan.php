<div class="container">
    <div id="plan" class="plan">
        <div></div>
        <div class="time morning" title="Morgens">
            <span class="text">Morgens</span>
            <img class="icon" src="images/icons/morgens.svg" />
        </div>
        <div class="time dinner" title="Mittags">
            <span class="text">Mittags</span>
            <img class="icon" src="images/icons/mittags.svg" />
        </div>
        <div class="time evening" title="Abends">
            <span class="text">Abends</span>
            <img class="icon" src="images/icons/abends.svg" />
        </div>
        <div class="time night" title="Nachts">
            <span class="text">Nachts</span>
            <img class="icon" src="images/icons/nachts.svg" />
        </div>
        <?php
            // Baue struktur
            $days = [
                "monday" => "Montag",
                "tuesday" => "Dienstag",
                "wednesday" => "Mittwoch",
                "thursday" => "Donnerstag",
                "friday" => "Freitag",
                "saturday" => "Samstag",
                "sunday" => "Sonntag"
            ];
            $currentDay = date('l');
            $times = [
                "morning" => [
                    "Morgens",
                    "images/icons/morgens.svg"
                ],
                "dinner" =>  [
                    "Mittags",
                    "images/icons/mittags.svg"
                ],
                "evening" =>  [
                    "Abends",
                    "images/icons/abends.svg"
                ],
                "night" =>  [
                    "Nachts",
                    "images/icons/nachts.svg"
                ]
            ];

            foreach ($days as $id => $name) {
                $class = null;

                if (strtolower($currentDay) === $id) {
                    $class = "current";
                }

                ?>
                    <div class="day <?php echo $id; ?> header <?php echo $class ?? ""; ?>" title="<?php echo $name; ?>">
                        <?php echo $name; ?>
                    </div>
                <?php

                foreach ($times as $time => $data) {
                    ?>
                        <div class="day <?php echo $id." ".$time; ?>" title="<?php echo $data[0]; ?>">
                            <div class="time">
                                <span class="text"><?php echo $data[0]; ?></span>
                                <img class="icon" src="<?php echo $data[1]; ?>" />
                            </div>
                            <div class="medications"></div>
                        </div>
                    <?php
                } 
            };

        ?>
    </div>
</div>