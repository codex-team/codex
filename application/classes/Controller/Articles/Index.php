<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;

        # место для кода массива комментариев для статьи

        $dblocation = '127.0.0.1';
        $dbname = 'difual-alpha';
        $dbuser = 'difual-alpha';
        $dbpassword = 'SpADffLB8y9WrHza';

        $dbcnx = @mysql_connect($dblocation, $dbuser, $dbpassword);
        if (!$dbcnx) {
            echo "Can't connect to ".$dblocation.".<br>Error: ".mysql_error();
            exit();
        }
        if (!@mysql_select_db($dbname, $dbcnx)) {
            echo "Database ".$dbname." currently not availiable.<br>Error:".mysql_error();
            exit();
        }
        mysql_query ("set character_set_results='utf8'");

        $this->view["comments"] = mysql_query("SELECT * FROM comments WHERE article = ".$id."");

        # конец кода массива комментариев

        $this->template->content = View::factory('templates/article/index', $this->view);
    }

    public function action_addComment()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];

        # место для кода сохранения комментария в бд

        $dblocation = '127.0.0.1';
		$dbname = 'difual-alpha';
		$dbuser = 'difual-alpha';
        $dbpassword = 'SpADffLB8y9WrHza';

        $dbcnx = @mysql_connect($dblocation, $dbuser, $dbpassword);
        if (!$dbcnx) {
            echo "Can't connect to ".$dblocation.".<br>Error: ".mysql_error();
            exit();
        }
        if (!@mysql_select_db($dbname, $dbcnx)) {
            echo "Database ".$dbname." currently not availiable.<br>Error:".mysql_error();
            exit();
        }
        mysql_query ("set character_set_results='utf8'");
        mysql_query("SET NAMES utf8");

        $sql = 'INSERT INTO comments(article, name, comment) VALUES("'.$id.'", "'.$name.'", "'.$comment.'")';
        mysql_query($sql);
        # конец кода сохранения комментария

        $this->redirect('/article/'.$id);
    }

}