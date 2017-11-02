<?php defined('SYSPATH') or die('No direct script access.');

class Model_Methods extends Model
{

    /**
    *	Site Methods Model
    */

    public $IMAGE_SIZES_CONFIG = array(
        // первый параметр - вырезать квадрат (true) или просто ресайзить с сохранением пропрорций (false)
        'o'  => array(false , 1500, 1500 ),
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


    public function saveImage($file, $path)
    {
        /**
         *   Проверки на  Upload::valid($file) OR Upload::not_empty($file) OR Upload::size($file, '8M') делаются в контроллере.
         */
        if (!Upload::type($file, array('jpg', 'jpeg', 'png', 'gif'))) {
            return false;
        }
        if (!is_dir($path)) {
            mkdir($path);
        }

        $copy_file = $file;

        if ($file = Upload::save($file, null, $path)) {
            $filename = bin2hex(openssl_random_pseudo_bytes(16)) . '.jpg';
            $image = Image::factory($file);

            foreach ($this->IMAGE_SIZES_CONFIG as $prefix => $sizes) {
                $isSquare = !!$sizes[0];
                $width    = $sizes[1];
                $height   = !$isSquare ? $sizes[2] : $width;
                $image->background('#fff');

                // Вырезание квадрата
                if ($isSquare) {
                    if ($image->width >= $image->height) {
                        $image->resize(null, $height, true);
                    } else {
                        $image->resize($width, null, true);
                    }
                    $image->crop($width, $height);
                } else {
                    if ($image->width > $width || $image->height > $height) {
                        $image->resize($width, $height, true);
                    }
                }
                $image->save($path . $prefix . '_' . $filename);
            }
            // Delete the temporary file
            unlink($file);
            return $filename;
        }

        return false;
    }

    public function saveRedactorsImage($file)
    {
        $filename = uniqid() . '.jpg';
        $image = Image::factory($file['tmp_name'])->save('upload/redactor_images/' . $filename);

        return $filename;
    }

    /**
     * @param array $sizes - array of keys in IMAGE_SIZES_CONFIG that need to be cropped
     * @param array $forcedSizes - new size config looks like IMAGE_SIZES_CONFIG
     */
    public function saveImageByUrl($url, $path, $sizes = null, $forcedSizes = null)
    {
        $file = $this->getFiles($url);

        if ($file) {
            if (!Upload::type($file, array('jpg', 'jpeg', 'png', 'gif'))) {
                return false;
            }
            if (!is_dir($path)) {
                mkdir($path);
            }
            return $this->saveRedactorsImage($file);
        }

        return false;
    }

    public function getFiles($url)
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

    public static function sendBotNotification($text)
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
            'message' => $text
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
    * Estimates reading time
    * @param string $text
    * @return string $output
    */
    public static function estimateReadingTime($text)
    {
         // Average reading time
        $WordsPerMinute = 150;

        $text = str_word_count(strip_tags($text));
        $time = ceil($text / $WordsPerMinute);
        $output = $time . ' min read';
        return $output;
    }
}
