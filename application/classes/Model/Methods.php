<?php defined('SYSPATH') or die('No direct script access.');

class Model_Methods extends Model
{
	/**
	*	Site Methods Model
	*/


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



    public function save_cover($cover, $uploaddir = 'upload/covers/')
    {
        $new_name = bin2hex(openssl_random_pseudo_bytes(5));
        $cover['name'] = $new_name . '.' . pathinfo($cover['name'], PATHINFO_EXTENSION);

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
    function SavePostFile($inputName, $dir = "", $fileTypes = array(), $maxFileSize = 2097152){
        // check 4 file was uploaded
        if ( (!$file = Arr::get($_FILES, $inputName) ) || ($file["error"] == 4) )
            return false;

        // todo get from config
        $uploaddir    = '/upload/' . ($dir ? $dir  : "");
        $uploaddirPhp = $_SERVER['DOCUMENT_ROOT'] . $uploaddir;

        // check 4 exists
        if (!file_exists($uploaddirPhp))
            $this->CreateDirRec($uploaddirPhp);

        // Validate size
        if ($file['size'] > $maxFileSize)
            return false;

        $fileParts = pathinfo($file['name']);

        // Validate the file type
        if ($fileTypes && !in_array($fileParts['extension'], $fileTypes)) {
            return false;
        }

        // translit name
        $name = basename($file['name'], "." . $fileParts['extension']);
        $name = $this->rus2translit( $name ) . "_" . time() . "." . $fileParts['extension']; // time() - 4 unigue same name files
        $uploadfileHtml = $uploaddir . $name;
        $uploadfilePhp  = $uploaddirPhp . $name;

        if ($res = move_uploaded_file($file['tmp_name'], $uploadfilePhp)){
            return $uploadfileHtml;
        }

        return false;
    }

    /**
     * Транслитерация кириллицы
     * @param string $string - строка с киррилицей
     */
    function rus2translit($string) {
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
        $token = '149275035:AAE6GB9PkrRBeS1PndeQVGewfJqlY5K-xtk';
        $chat_id = -42287706;

        $text = $err;

        $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';

        $params = array(
            'chat_id' => $chat_id,
            'text' => $text
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);

        return true;
    }
}
