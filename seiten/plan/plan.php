<div class="container">
    <div id="plan" class="plan">
        <div></div>
        <div class="time morning" title="Morgens">
            <span class="text">Morgens</span>
            <img class="icon" alt="morgens" src="images/icons/morgens.svg" />
        </div>
        <div class="time dinner" title="Mittags">
            <span class="text">Mittags</span>
            <img class="icon" alt="mittags" src="images/icons/mittags.svg" />
        </div>
        <div class="time evening" title="Abends">
            <span class="text">Abends</span>
            <img class="icon" alt="abends" src="images/icons/abends.svg" />
        </div>
        <div class="time night" title="Nachts">
            <span class="text">Nachts</span>
            <img class="icon" alt="nachts" src="images/icons/nachts.svg" />
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

                // Header
                ?>
                    <div class="day <?php echo $id; ?> header <?php echo $class ?? ""; ?>" title="<?php echo $name; ?>">
                        <?php echo $name; ?>
                    </div>
                <?php

                // Days
                foreach ($times as $time => $data) {
                    ?>
                        <div class="day <?php echo $id." ".$time; ?>" title="<?php echo $data[0]; ?>">
                            <div class="time">
                                <span class="text"><?php echo $data[0]; ?></span>
                                <img alt="<?php echo $data[0]; ?>" class="icon" src="<?php echo $data[1]; ?>" />
                            </div>
                            <div class="medications"></div>
                            <div class="buttons">
                                <button type="button" class="add" title="Hinzufügen">
                                    <svg width="800px" height="800px" viewBox="0 0 24 24">
                                        <g>
                                            <line stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"/>
                                            <line stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"/>
                                        </g>
                                    </svg>
                                </button>
                                <button type="button" class="edit" title="Bearbeiten">
                                    <svg width="800px" height="800px" viewBox="0 0 24 24">
                                        <path d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    <?php
                } 
            };

        ?>
    </div>
</div>