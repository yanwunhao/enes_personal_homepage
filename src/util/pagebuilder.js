export function header_factory() {
    const element = document.createElement('div')

    element.id = 'header'

    return element
}

export function main_factory() {
    const element = document.createElement('div')

    element.id = 'main'

    return element
}

export function primary_nav_factory() {
    const element = document.createElement('ul')

    element.id = 'primary_nav'

    return element
}

export function primary_navItem_factory(content) {
    const element = document.createElement('li')

    element.innerText = content

    element.className = 'primary_nav_item'

    return element
}

export function primary_content_factory() {
    const element = document.createElement('div')

    element.id = 'primary_content'

    return element
}

export function footer_content_factory() {
    const element = document.createElement('div')

    element.id = 'footer_content'

    return element
}

export function image_factory_by_id(img, id) {
    const image = new Image()
    image.src = img
    image.id = id

    return image
}

export function strong_factory(content) {
    const strong = document.createElement('strong')

    strong.innerText = content

    return strong
}

export function paragraph_factory(content, class_name) {
    const title = document.createElement('p')

    title.innerHTML = content

    title.className = class_name

    return title
}

export function div_factory(class_name) {
    const div = document.createElement('div')

    div.className = class_name

    return div
}

export function ul_factory(class_name) {
    const ul = document.createElement('ul')

    ul.className = class_name

    return ul
}

export function li_factory(content, class_name) {
    const li = document.createElement('li')

    li.innerHTML = content

    li.className = class_name

    return li
}

export function hyperlink_factory(content, url, class_name) {
    const hyperlink = document.createElement('a')

    hyperlink.innerText = content

    hyperlink.href = url

    hyperlink.className = class_name

    return hyperlink
}