/**
 * Created by Marco on 04.11.2015.
 */

// надо бы подключать нужные файлы в контроллере по мере необходимости
// но пока один общий файл
// над кодом можно еще поработать и оптимизировать его, добавить комментов

// скрипты для страницы редактирования
if (document.querySelector(".edit_article")){
    change_cover_btn = document.getElementById("change_cover_btn")
    change_cover_i = document.getElementById("change_cover_i")

    delete_cover = document.getElementById("delete_cover")
    delete_cover_i = document.getElementById("delete_cover_i")

    change_cover_btn.onclick = function(e){
        change_cover_i.click()

        return false
    }

    change_cover_i.onchange = function(e){
        change_cover_i.files[0]

        input = this

        if (input.files && input.files[0]) {
            reader = new FileReader();
            if (!(cover_img = document.getElementById("cover_img"))){
                no_cover = document.getElementById("no_cover")

                cover_img = document.createElement('img')
                cover_img.setAttribute('id', "cover_img")

                parentDiv = no_cover.parentNode;
                parentDiv.insertBefore(cover_img, no_cover);
            }

            no_cover.classList.add("hidden")
            delete_cover_i.setAttribute('value', "N")
            cover_img.setAttribute('src', "/public/img/loading.gif")

            cover_img.classList.remove("hidden")

            //
            delete_cover.classList.remove("hidden")

            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {
                cover_img.setAttribute('src', e.target.result)
            }
        }
    }

    delete_cover.onclick = function(e){
        delete_cover.classList.add("hidden")
        no_cover.classList.remove("hidden")
        cover_img.classList.add("hidden")

        // 4 get select the same img again
        // clearFileInputField(change_cover_i)
        // change_cover_i_onclick = change_cover_i.onclick
        // change_cover_i = document.getElementById("change_cover_i")
        // change_cover_i.onclick = change_cover_i_onclick

        delete_cover_i.setAttribute('value', "Y")

        return false
    }

    // document.querySelector(".edit_article button").addEventListener('click', function(e) { // dosnt work ?
    document.querySelector(".edit_article").onsubmit =  function(e) {
        // todo legacy support, ie <= 9
        formData = new FormData(this);

        document.querySelector(".edit_article button").setAttribute("disabled", "disabled")
        document.querySelector(".edit_article button").textContent = "Сохранение изменений..."

        var xhr = new XMLHttpRequest();
        xhr.open('POST', location.href, true);

        xhr.onload = function(e) {
            // console.log("answer", e.currentTarget.responseText)
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.querySelector(".edit_article button").textContent = "Изменения сохранены!"
                // alert("Изменения сохранены!");

                // friendly mode :)
                setTimeout(function() {
                    document.querySelector(".edit_article button").removeAttribute("disabled")
                    document.querySelector(".edit_article button").textContent = "Добавить / Изменить"
                }, 750);

                // errors
                var parser = new DOMParser()
                var dom = parser.parseFromString(e.currentTarget.responseText, "text/html");
                // console.log("dom", dom)

                document.querySelector(".errors").innerHTML = dom.querySelector(".errors").innerHTML

                // if it was new article, insert her ID 4 next update without reloading page
                articleId    = document.querySelector("[name=article\\[ID\\]]")
                articleNewId = dom.querySelector("[name=article\\[ID\\]]")
                if (!articleId.value && articleNewId.value){
                    articleId.value = articleNewId.value
                    history.pushState(false, false, "?id=" + articleNewId.value);
                    document.querySelector("h1").textContent = "Редактирование статьи"
                    document.querySelector("title").textContent = "Редактирование статьи"

                    // todo legacy
                    // location.href = "/edit_article.php?id=" + articleNewId.value
                }
            } else
                console.log("Error while ajax request:", xhr, e.currentTarget.responseText)
        }

        xhr.send(formData);  // multipart/form-data

        return false
    }
}