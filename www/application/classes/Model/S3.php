<?php defined('SYSPATH') or die('No direct script access.');

use Aws\S3\S3Client;

class Model_S3 extends Model
{
    /**
     * Upload a file to S3
     * 
     * @param array $file - The file to be uploaded
     * @param string $folder - The folder where the file will be uploaded
     * 
     * @return string - The URL of the uploaded file
     */
    public static function upload($file, $folder)
    {
        $s3 = new S3Client([
            'version' => 'latest',
            'region'  => $_ENV['AWS_REGION'],
            'credentials' => [
                'key'    => $_ENV['AWS_ACCESS_KEY_ID'],
                'secret' => $_ENV['AWS_SECRET_ACCESS_KEY'],
            ],
        ]);

        $filename = self::generateName($file);
        
        $s3->putObject([
            'Bucket' => $_ENV['AWS_BUCKET'],
            'Key'    => $folder . '/' . $filename,
            'Body'   => fopen($file['tmp_name'], 'rb'),
            'ContentType' => $file['type'],
        ]);

        $url = self::composeObjectURL($filename, $folder);

        return $url;
    }

    /**
     * Generates a random name for the file
     * 
     * @param array $file - The file to be uploaded
     * 
     * @return string - The generated file name
     */
    private static function generateName($file)
    {
        $ext = self::getExtension($file);
        $filename = bin2hex(openssl_random_pseudo_bytes(16)) . '.' . $ext;

        return $filename;
    }

    /**
     * Get the extension of the file
     * 
     * @param array $file - The file to be uploaded
     * 
     * @return string - The file extension
     */
    private static function getExtension($file) {
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

        return $ext;
    }

    /**
     * Compose the URL for the uploaded file
     * 
     * @param string $filename - The generated file name
     * @param string $folder - The folder where the file was uploaded
     * 
     * @return string - The URL of the uploaded file
     */
    private static function composeObjectURL($filename, $folder)
    {
        $url = $_ENV['STATIC_HOST'] . '/' . $folder . '/' . $filename;

        return $url;
    }
}
