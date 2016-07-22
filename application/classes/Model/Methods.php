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
        if($num > 10 && ( floor(($num % 100) / 10) )  == 1){
                return $genitive_plural;
        } else {
            switch($num % 10){
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

        if ($file = Upload::save($cover, NULL, $uploaddir)){
            Image::factory($file)->save($uploaddir . $cover['name']);
            unlink($file);

            return $cover['name'];
        }
        else {
            return false;
        }
    }


    /**
     * Сохраняем файл загруженный через форму
     * @param string $inputName - название инпута с файлом
     * @param string $dir - путь относительно каталога /upload/. Должен начинаться без слеша и заканчиваться слешом, например "covers/"
     * Создается рекурсивно если не существует.
     * @param int $maxFileSize - макс размер файла в байтах. По умолчанию 2Mb
     * @param array $fileTypes - допустимые разширения файлов. По умолчанию не проверяется
     */
    public function saveImage( $file , $path )
    {
        /**
         *   Проверки на  Upload::valid($file) OR Upload::not_empty($file) OR Upload::size($file, '8M') делаются в контроллере.
         */
        if (!Upload::type($file, array('jpg', 'jpeg', 'png', 'gif'))) return FALSE;

        if (!is_dir($path)) mkdir($path);

        if ( $file = Upload::save($file, NULL, $path) ){

            $filename = uniqid("", false).'.jpg';
            $image = Image::factory($file);
            $image->save($path . $filename);

            // Delete the temporary file
            unlink($file);
            return $filename;
        }
        return FALSE;
    }

    /** Saving uploaded file to database */
    public function newFile( $fields )
    {
        return current(DB::insert( 'files' , array_keys($fields) )->values(array_values($fields))->execute());
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
    public static function rus2translit($string) {
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
    function CreateDirRec($path, $rights = 0777){
        //        mkdir($parh, $rights, true); // do not work recursivle on win :(

        $arr = explode('/', $path);
        $dir = "";

        foreach($arr as $key => $val){
            $dir .= $val . "/";

            if (!file_exists($dir))
                mkdir($dir, $rights);
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

    public static function telegram_send_error($err)
    {
        $telegramConfig = Kohana::$config->load('telegrambot.default');        

        $text = $err;

        $url = 'https://api.telegram.org/bot' . $telegramConfig['token'] . '/sendMessage';

        $params = array(
            'chat_id' => $telegramConfig['chatId'],
            'text' => $text
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
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
        if ($parsed_url == '/' || $parsed_url == null){
            return null;
        } elseif (substr($parsed_url, 0, 1) == '/'){
            return substr($parsed_url, 1);
        } else {
            return $parsed_url;
        }
    }
}
