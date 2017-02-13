<?php
foreach($posts as $post):
echo '<div'.HTML::attributes(array('class'=>'post')).">\n";
echo "\t<h2>".$post['title']."</h2>\n";
echo "\t<div>".$post['post']."</div>\n";
echo '</div>'."\n";
endforeach;

echo Form::open(url::base().'feedback/posts/',array('method' => 'post'))."\n";
echo '<div>';
echo "\t".Form::label('title', 'Заголовок')."\n";
echo "\t".Form::input('title')."\n";
echo "</div>\n";
echo '<div>';
echo "\t".Form::label('post', 'Сообщение')."\n";
echo "\t".Form::textarea('post' ,NULL ,array('rows' => 5, 'cols' => 20))."\n";
echo "</div>\n";
echo Form::submit('submit', 'Отправить')."\n";
echo Form::close()."\n";
?>