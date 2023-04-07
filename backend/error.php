<?php

    class APIError {
        public $id;
        public $message;

        function  __construct($id="", $message=null) {
            $this->id = $id;
            $this->message = $message;
        }
    }

    class APIErrors {
        public $errors = [];

        function addError(APIError $error) {
            http_response_code(422);
            $this->errors[$error->id] = $error;
        }

        function empty(): bool {
            return count($this->errors)>0;
        }

        function add($id, $message) {
            $this->addError(new APIError($id, $message));
        }

    }

?>