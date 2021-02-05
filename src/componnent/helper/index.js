import { div_factory } from '../../util/pagebuilder'
import './style.css'
import image from '../../asset/enes_helper.png'

const helper = document.createElement('div')
helper.id = 'helper'

const helper_img = document.createElement('img')
helper_img.id = 'helper_image'
helper_img.src = image

helper.appendChild(helper_img)

helper.addClickEvent = function (func) {
    helper.addEventListener('click', func)
}

export default helper