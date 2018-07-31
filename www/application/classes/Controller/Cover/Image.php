<?php use CodexEditor\CodexEditor;

defined('SYSPATH') or die('No direct script access.');

class Controller_Cover_Image extends Controller_Base_preDispatch
{

    const WIDTH = 1074;
    const HEIGHT = 480;

    const PADDING = 60;

    const BACKGROUND_COLOR = '#FFFFFF';

    public $width = self::WIDTH;
    public $height = self::HEIGHT;

    public function action_index()
    {
        $social = $this->request->param('social', null);

        $type = $this->request->param('type', 'default');
        $target = (int) $this->request->param('target', 0);

        switch ($social) {
            case 'tw':
            case 'fb':
                $this->width = 1200;
                $this->height = 530;
            break;
            case 'vk':
                // $this->width = 1074;
                // $this->height = 480;
                break;
        }

        $cover = null;
        
        try {
            switch ($type) {
                case 'article':
                    $cover = $this->article($target);
                    break;
            }
        } catch (\Throwable $ignored) { }

        if (!$cover) {
            $cover = $this->background();
        }

        $this->auto_render = false;
        $this->response->headers('Content-Type', 'image/jpeg');
        $this->response->body(
            $cover->render()
        );
    }

    private function background($image = null)
    {
        $cover = new \SocialCoversGenerator\Generator($this->width, $this->height, self::BACKGROUND_COLOR);

        if ($image !== null) {
            $background = new \SocialCoversGenerator\Types\BackgroundImage();
            $background->setPath($image);

            $blackout = new \SocialCoversGenerator\Properties\Blackout();
            $blackout->setColor('#000000');
            $blackout->setOpacity(0.7);

            $background->setBlackout($blackout);
        } else {
            $background = new \SocialCoversGenerator\Types\Background();
        }

        $background->setColor(self::BACKGROUND_COLOR);
        $background->setWidth($this->width);
        $background->setHeight($this->height);
        $background->setName('background');

        $cover->addLayer($background);

        return $cover;
    }

    private function article($articleId)
    {
        $font_color = '#000000';

        $article = Model_Article::get($articleId);

        $image = null;
        try {
            $editor = new CodexEditor($article->text);
            $blocks = $editor->getBlocks();

            foreach ($blocks as $block) {
                if ($block['type'] === 'image') {
                    $font_color = '#FFFFFF';
                    $image = substr($block['data']['url'], 0, 4) !== 'http' ? sprintf('%s/%s', Model_Methods::getDomainAndProtocol(), $block['data']['url']) : $block['data']['url'];
                    break;
                }
            }
        } catch (Exception $e) {
            \Hawk\HawkCatcher::catchException($e);
        }

        $cover = $this->background($image);

        if ($article->id === 0) {
            return $cover;
        }

        /**
         * Title
         */
        $title = new \SocialCoversGenerator\Types\Text();
        $title->setMaxWidth($this->width - self::PADDING*5);
        $title->setAlignment(\SocialCoversGenerator\Types\Text::ALIGN_LEFT);
        $title->setMaxNumberOfLines(3);
        $title->setText($article->title);

        $font = new \SocialCoversGenerator\Properties\Font();
        $font->setColor($font_color);
        $font->setFile(sprintf('%s/public/fonts/Roboto/%s', DOCROOT, 'Roboto-Black.ttf'));
        $font->setSize(55);

        $title->setFont($font);

        $magnetic = new \SocialCoversGenerator\Properties\Magnetic();
        $magnetic->setLeft(self::PADDING);
        $magnetic->setTop(self::PADDING);
        $magnetic->setToLayer('background');

        $title->setMagnetic($magnetic);

        $cover->addLayer($title);

        /**
         * Author image
         */
        $author_photo_url = substr($article->author->photo, 0, 4) !== 'http' ? sprintf('%s/%s', Model_Methods::getDomainAndProtocol(), $article->author->photo) : $article->author->photo;
        $author_image = new \SocialCoversGenerator\Types\Image();
        $author_image->setPath($author_photo_url);
        $author_image->setWidth(50);
        $author_image->setHeight(50);
        $author_image->setRoundCorners(25);
        $author_image->setName('author_image');

        $magnetic = new \SocialCoversGenerator\Properties\Magnetic();
        $magnetic->setLeft(self::PADDING);
        $magnetic->setBottom(- 55 - 50);
        $magnetic->setToLayer('background');

        $author_image->setMagnetic($magnetic);

        $cover->addLayer($author_image);

        /**
         * Author name
         */
        $author_name = new \SocialCoversGenerator\Types\Text();
        $author_name->setMaxWidth(500);
        $author_name->setAlignment(\SocialCoversGenerator\Types\Text::ALIGN_LEFT);
        $author_name->setMaxNumberOfLines(1);
        $author_name->setText(mb_strtoupper($article->author->name));

        $font = new \SocialCoversGenerator\Properties\Font();
        $font->setColor($font_color);
        $font->setFile(sprintf('%s/public/fonts/Roboto/%s', DOCROOT, 'Roboto-Bold.ttf'));
        $font->setSize(32);

        $author_name->setFont($font);

        $magnetic = new \SocialCoversGenerator\Properties\Magnetic();
        $magnetic->setRight(15);
        $magnetic->setVerticalCenter(true);
        $magnetic->setToLayer('author_image');

        $author_name->setMagnetic($magnetic);

        $cover->addLayer($author_name);

        return $cover;
    }

}