Сделано вместе с Урмат Бекбоев

Занятие 96 - лабораторная работа
Необходимо создать приложение для создания рецептов коктейлей.

 

Основные сущности:

Пользователь

ФейсбукИД

Роль (пользователь, админ)

Коктейль

Пользователь

Название

Изображение

Рецепт

Опубликован? (булевое значение)

Ингредиенты (массив): [

Название ингредиента (строковое поле) (напр. Gin)

Количество ингредиента (строковое поле) (напр. 15 ml)
]

Оценки (массив): [

ИД пользователя

Оценка
]

 

Пользователи могут регистрироваться/логиниться только через фейсбук. У пользователя должны быть поля "avatar" и "display_name", которые должны отображаться в навигационном меню залогиненному пользователю.

 

Пользователи могут добавлять коктейли, при этом они по-умолчанию становятся не опубликованными (невидимыми никому). После создания коктейля появляется надпись "ваш коктейль находится на рассмотрении модератора".

 

Пользователь может заходить на страницу "мои коктейли". При этом должны отображаться все свои добавленные коктейли (даже неопубликованные).

 

Активировать (публиковать) и видеть неопубликованные коктейли могут только администраторы. Также администраторы могут удалять любые коктейли.

 

Форма создания нового коктейля и отображение коктейля на следующей странице.

 

(дополнительно) Пользователи могут заходить на страницу просмотра коктейля и оставлять оценку от 1 до 5 баллов. Также здесь отображается количество оценок и средний балл. Пользователь может голосовать только один раз. Если он уже голосовал, должна отображаться его текущая оценка. Он может нажать на нужную оценку еще раз, при этом его оценка должна измениться.
