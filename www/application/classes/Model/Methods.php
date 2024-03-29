<?php defined('SYSPATH') or die('No direct script access.');

class Model_Methods extends Model
{

    /**
     * Get server domain name and protocol
     *
     * @return {string} $protocol.$domain
     */
    public static function getDomainAndProtocol()
    {
        return self::getProtocol() . "://" . $_SERVER['HTTP_HOST'];
    }

    /**
     * Get protocol
     *
     * @return {string} $protocol
     */
    public static function getProtocol()
    {
        if ( isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
            isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
            $protocol = 'https';
        } else {
            $protocol = 'http';
        }
        return $protocol;
    }

    /**
    *	Site Methods Model
    */

    public $IMAGE_SIZES_CONFIG = array(
        // первый параметр - вырезать квадрат (true) или просто ресайзить с сохранением пропрорций (false)
        'o'  => array(false , 2500, 2500 ),
        'b'  => array(true , 200 ),
        'm'  => array(true , 100 ),
        's'  => array(true , 50  ),
    );

    /**
    * Склонение существительных после числительных
    * @param string $num - числительное
    * @param string $nominative - именительный падеж
    * @param string $genitive_singular - родительный падеж, единственное число
    * @param string $genitive_plural - родительный падеж, множественное число
    */
    public function num_decline($num, $nominative, $genitive_singular, $genitive_plural)
    {
        if ($num > 10 && (floor(($num % 100) / 10))  == 1) {
            return $genitive_plural;
        } else {
            switch ($num % 10) {
                case 1: return $nominative;
                case 2: case 3: case 4: return $genitive_singular;
                case 5: case 6: case 7: case 8: case 9: case 0: return $genitive_plural;
            }
        }
    }

    public function save_cover($cover)
    {
        $new_name = bin2hex(openssl_random_pseudo_bytes(5));
        $cover['name'] = $new_name . '.' . pathinfo($cover['name'], PATHINFO_EXTENSION);

        $uploaddir = 'upload/covers/';

        if ($file = Upload::save($cover, null, $uploaddir)) {
            Image::factory($file)->save($uploaddir . $cover['name']);
            unlink($file);

            return $cover['name'];
        } else {
            return false;
        }
    }

    /**
     * Save uploaded media to S3
     */
    public static function saveMedia($file, $folder)
    {
        try {
            $filename = Model_S3::upload($file, $folder);

            // Delete the temporary file
            unlink($file['tmp_name']);

            return $filename;
        } catch (Exception $e) {
            return false;
        }
    }


    /**
     * DEPRECATED
     * 
     * Save uploaded image
     * @param resource $file - uploaded file
     * @param string $path - path where image will be saved
     * @return array|bool - object with image data: filename, width and height
     * @throws Kohana_Exception
     */
    public function saveImage($file, $path)
    {
        /**
         * Проверки на  Upload::valid($file) OR Upload::not_empty($file) OR Upload::size($file, '8M') делаются в контроллере.
         */
        if (!Upload::type($file, array('jpg', 'jpeg', 'png', 'gif'))) {
            return false;
        }

        if (isset($file['tmp_name'])) {
            $filename = Model_S3::upload($file, 'images');

            // Delete the temporary file
            unlink($file['tmp_name']);

            return array(
                'name' => $filename
            );
        }

        return false;
    }

    /**
     * DEPRECATED
     * 
     * Save uploaded video
     * @param resource $file - uploaded file
     * @param string $path - path where video will be saved
     * @return array|bool - object with image data: filename
     * @throws Kohana_Exception
     */
    public function saveVideo($file, $path)
    {
        if (!Upload::type($file, array('mp4', 'mov'))) {
            return false;
        }

        if (isset($file['tmp_name'])) {
            $filename = Model_S3::upload($file, 'images');
            
            // Delete the temporary file
            unlink($file['tmp_name']);

            return array(
                'name' => $filename
            );
        }

        return false;
    }

    /**
     * Download file by url
     */
    public function getFile($url)
    {
        $tempName = tempnam('/tmp', 'tmp_files');

        $originalName = basename(parse_url($url, PHP_URL_PATH));

        $imgRawData = @file_get_contents($url);

        if (!$imgRawData) {
            return false;
        }
        file_put_contents($tempName, $imgRawData);
        return array(
            'name' => $originalName,
            'type' => mime_content_type($tempName),
            'tmp_name' => $tempName,
            'error' => 0,
            'size' => strlen($imgRawData),
        );
    }


    /** Saving uploaded file to database */
    public function newFile($fields)
    {
        return current(DB::insert('files', array_keys($fields))->values(array_values($fields))->execute());
    }

    public static function getUriByTitle($string)
    {
        // заменяем все кириллические символы на латиницу
        $converted_string = self::rus2translit($string);
        // заменяем все не цифры и не буквы на дефисы
        $converted_string = preg_replace("/[^0-9a-zA-Z]/", "-", $converted_string);
        // заменяем несколько дефисов на один
        $converted_string = preg_replace('/-{2,}/', '-', $converted_string);
        // отсекаем лишние дефисы по краям
        $converted_string = trim($converted_string, '-');
        return $converted_string;
    }

    /**
     * Транслитерация кириллицы
     * @param string $string - строка с киррилицей
     */
    public static function rus2translit($string)
    {
        $converter = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'y',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'h',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
            'ь' => "",    'ы' => 'y',   'ъ' => "",
            'э' => 'e',   'ю' => 'yu',  'я' => 'ya',

            'А' => 'A',   'Б' => 'B',   'В' => 'V',
            'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
            'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
            'И' => 'I',   'Й' => 'Y',   'К' => 'K',
            'Л' => 'L',   'М' => 'M',   'Н' => 'N',
            'О' => 'O',   'П' => 'P',   'Р' => 'R',
            'С' => 'S',   'Т' => 'T',   'У' => 'U',
            'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
            'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
            'Ь' => "",    'Ы' => 'Y',   'Ъ' => "",
            'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
            ' ' => '_',   '-' => '_',   '-' => '_',    '.' => '_',
            ',' => '_',   '\'' => '',   '\"' => '',    '(' => '_', ')' => '_',
            '?' => '_',   '#' => '_',   '$' => '_',    '!' => '_',
            '@' => '_',   '%' => '^',   '&' => '_',    '*' => '_',
            '`' => '_',   '\\' => '_',  '/' => '_'//,    '*' => '_'
        );
        // translit
        $tmp = strtr($string, $converter);
        // remove underline from begin and end of line
        $tmp = trim($tmp, "_");
        // replace lines
        $tmp = strtr($tmp, array(
            "__"    => "_",
            "___"   => "_",
            "____"  => "_",
            "_____" => "_",
        ));

        return $tmp;
    }

    public static function isAjax()
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest');
    }


    /**
     * Рекурсивно создает директории по указанному пути
     * @param string $path - строка с киррилицей
     * @param int $rights   - права на директории. По умолчанию 0777
     */
    public function CreateDirRec($path, $rights = 0777)
    {
        //        mkdir($parh, $rights, true); // do not work recursivle on win :(

        $arr = explode('/', $path);
        $dir = "";

        foreach ($arr as $key => $val) {
            $dir .= $val . "/";

            if (!file_exists($dir)) {
                mkdir($dir, $rights);
            }
        }
    }

    public function rebuildCommentsTree($comments)
    {
        $comments_table_rebuild = array();

        $i = 0;
        foreach ($comments as $comment):
            $comments_table_rebuild[] = $comment;

        $var_k = $i;
        for ($j = 0; $j < $i; $j++) {
            if ($comment->parent_id == $comments_table_rebuild[$j]->id) {
                for ($k = $j + 1; $k < $i; $k++) {
                    if ($comment->parent_id != $comments_table_rebuild[$k]->parent_id) {
                        $var_k = $k;
                        break;
                    };
                };
                break;
            };
        };
        for ($j = $i; $j >= $var_k; $j--) {
            $comments_table_rebuild[$j + 1] = $comments_table_rebuild[$j];
        }

        $comments_table_rebuild[$var_k] = $comment;
        $i++;
        endforeach;
        array_pop($comments_table_rebuild);

        return $comments_table_rebuild;
    }

    /**
     * Send a notification to project's chat in Telegram
     *
     * @param {string} $text - message's text
     * @param {string} $parse_mode - HTML, Markdown or none
     * @param {boolean} $disable_web_page_preview — disable links preview
     */
    public static function sendBotNotification($text, $parse_mode = '', $disable_web_page_preview = false)
    {
        $telegramConfigFilename = 'telegram-notification';

        $telegramConfig = Kohana::$config->load($telegramConfigFilename);

        if (!property_exists($telegramConfig, 'url')) {
            throw new Kohana_Exception("No $telegramConfigFilename config file was found!");
            return;
        }

        $url = $telegramConfig->url;

        if (!$url) {
            throw new Kohana_Exception("URL for telegram notifications was not found.");
            return;
        }

        $params = array(
            'message' => $text,
            'parse_mode' => $parse_mode,
            'disable_web_page_preview' => $disable_web_page_preview
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);

        return true;
    }


    /**
     * Парсит url отсекает uri
     * @return String, если успешно спрасилось
     * @return null, если не валидная строка
     */
     public function parseUri($url)
     {
         $parsed_url = parse_url($url, PHP_URL_PATH);

        //проверки на валидность строки
        if ($parsed_url == '/' || $parsed_url == null) {
            return null;
        } elseif (substr($parsed_url, 0, 1) == '/') {
            return substr($parsed_url, 1);
        } else {
            return $parsed_url;
        }
     }

    /**
    * Saves user join-request
    * @param array $fields  skills, wishes, uid, email, name
    */
    public function saveJoinRequest($fields)
    {
        $saving = Dao_Requests::insert();

        foreach ($fields as $fieldName => $value) {
            $saving->set($fieldName, $value);
        }

        if (!empty($fields['uid'])) {
            $saving->clearcache($fields['uid']);
        }

        return $saving->execute();
    }

   /**
    * Fetches an absolute site URL based on a URI segment
    * @param string $url of an object, absolute or relative
    * @return string $url, absolute
    */
    public static function makeUrlFull($url)
    {
        if (strncmp($url, 'http', 4)) {
            $url = URL::site($url, self::getProtocol());
        }

        return $url;
    }

    /**
     * Countdowns string read time
     * @param  string $text
     * @param  float  $time
     * @return float - minutes to read
     */
    private static function countEstimateReadingTime( $str ){

        /**
         * Words per minute
         * @var integer
         */
        $speed = 800;

        /**
         * Remove tags and symbols
         */
        $justText = str_replace(array('_', '-', '—', ' '), '', strip_tags($str));
        $justText = trim($justText);

        /**
         * Compute length
         */
        $length = mb_strlen($justText);

        /**
         * Compute time to read per minute
         */
        $time = round($length / $speed);

        /**
         * Return time in range: 1 < time < 100
         */
        return min(100, max(1, $time));
    }

    /**
     * Estimates reading time
     * @param string $text
     * @param string $blocksJSON - JSON with entry blocks generated by CodeX Editor
     * @return float $time       - minutes to read
     */
    public static function estimateReadingTime($text = '', $blocksJSON = '')
    {
        if ($text) {
            return self::countEstimateReadingTime($text);
        }

        /**
         * Where plugins stores text-data
         * @var array
         */
        $pluginsTextFields = array(
            'paragraph' => array('text'),
            'header' => array('text'),
            'quote' => array('text', 'caption'),
            'image' => array('caption'),
            'code' => array('code'),
            'list' => array('items')
        );

        try {

            $blocks = json_decode($blocksJSON);

            if (!isset($blocks->blocks)) {
                return 0;
            }

            /**
             * Compose concatinated entry text
             * @var string
             */
            $entryText = '';

            /**
             * Iterate each entry blocks
             */
            foreach ($blocks->blocks as $block) {

                /**
                 * Skip block without text
                 */
                if (!isset($pluginsTextFields[$block->type])) {
                    continue;
                }

                $fieldsWithText = $pluginsTextFields[$block->type];

                /**
                 * Iterate all fields with text and concatinate summary text
                 */
                foreach ($fieldsWithText as $fieldname) {

                    /**
                     * Because list plugin has nested structure, we concatenate its items' text to the summary text
                     */
                    if (is_array($block->data->$fieldname)) {
                        foreach ($block->data->$fieldname as $item) {
                            $entryText .= $item;
                        }

                        continue;
                    }

                    if (!empty($block->data->$fieldname)) {
                        $entryText .= $block->data->$fieldname;
                    }
                }
            }

            /**
             * Count reading time for all entry text
             * @var integer
             */
            return self::countEstimateReadingTime($entryText);

        } catch (Exception $e) {

            \Hawk\HawkCatcher::catchException($e);
            return 0;
        }
    }

    /**
     * Calculate days, hours and minutes left when new members can join the club
     * @param string $last_chance_to_join - string in Date format Y-m-d H:i
     * @return array
     *         string array['days_left'] - days left to join the club
     *         string array['hours_left'] - hours left to join the club
     *         string array['minutes_left'] - minutes left to join the club
     */
    public static function countDownJoinTime($last_chance_to_join){
        $today = new DateTime(date("Y-m-d H:i"));

        $join_end_date = new DateTime($last_chance_to_join);

        /**
         * Get difference between today's date and the end join date
         */
        $difference = $today->diff($join_end_date);

        /**
         * Add zeros to the left if there is only one digit
         */
        return array(
            'days_left' => str_pad($difference->d, 2, 0, STR_PAD_LEFT),
            'hours_left' => str_pad($difference->h, 2, 0, STR_PAD_LEFT),
            'minutes_left' => str_pad($difference->i, 2, 0, STR_PAD_LEFT),
        );
    }
}
