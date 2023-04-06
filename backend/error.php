<?php

    class APIError {
        public $message;
        public $status;

        function  __construct($message=null, $status=400) {
            $this->message = $message;
            $this->setStatus($status);
        }

        function setMessage($message) {
            $this->message = $message;
        }

        function setStatus($status=400) {
            $this->status = $status;
            http_response_code($status);
        }

    }

?>