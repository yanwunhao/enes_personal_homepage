import './style.css'

import Logo from './asset/muit_logo.png'
import Logo_Footer from './asset/muit_logo_footer.png'

import * as pb from './util/pagebuilder'

import { get_catalog, get_footer_info } from './util/request'

import { enes_event_listener } from './util/event_listener'

import imageViewer from './componnent/imageviewer'
import cover from './componnent/cover'
import helper from './componnent/helper'

// Set up global plugin
document.body.appendChild(imageViewer)
imageViewer.style.display = 'none'

document.body.appendChild(cover)
cover.style.display = 'none'

document.body.appendChild(helper)

cover.addEventListener('click', () => {
    imageViewer.style.display = 'none'
    cover.style.display = 'none'
})

imageViewer.addEventListener('click', () => {
    imageViewer.style.display = 'none'
    cover.style.display = 'none'
})

let fake_url = ''
helper.addClickEvent(() => { alert('The URL of Current Page is ' + fake_url) })

// Set up body
const body_content = pb.body_content_factory()
document.body.appendChild(body_content)

// Set up header
const header = pb.header_factory()

const top_border = pb.div_factory('top_border')
header.appendChild(top_border)

const title = pb.paragraph_factory('Welcome to My Website', 'title')

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

const a_logo = pb.hyperlink_factory('', 'http://www.muroran-it.ac.jp/en/', '')
a_logo.appendChild(logo)

header.appendChild(a_logo)

header.appendChild(title)

body_content.appendChild(header)

// Set aside navlist
const primary_nav = pb.primary_nav_factory()

const main = pb.main_factory()

main.appendChild(pb.paragraph_factory('About Me', 'maintitle'))

const primary_content = pb.primary_content_factory()

// Set footer info
const footer_content = pb.footer_content_factory()

const footer_request = get_footer_info()

footer_request.send(null)

if (footer_request.status === 200) {
    const datalist = footer_request.responseText.split('\r\n')

    const data = datalist[1].split(',')

    footer_content.appendChild(pb.paragraph_factory(data[0], ''))
    footer_content.appendChild(pb.paragraph_factory(data[1], ''))

    const reg = new RegExp('/', 'g') // replace / in csv to ,
    footer_content.appendChild(pb.paragraph_factory(data[2].replace(reg, ', '), ''))

    footer_content.appendChild(pb.paragraph_factory('Email: ' + data[3], ''))
    footer_content.appendChild(pb.paragraph_factory('Tel: ' + data[4], ''))
    footer_content.appendChild(pb.paragraph_factory('Fax: ' + data[5], ''))

    footer_content.appendChild(pb.paragraph_factory('<a href="../index.html">ENeS Lab</a> | <a href="http://www.muroran-it.ac.jp/en/link_d/d_iee.html" target="_blank">Department of IEE</a> | <a href="http://www.muroran-it.ac.jp/en/" target="_blank">Muroran IT</a>', ''))

    const footer_logo = new Image()

    footer_logo.src = Logo_Footer

    footer_logo.id = 'footer_logo'

    footer_content.appendChild(footer_logo)
}

const catalog_request = get_catalog()

catalog_request.then(response => {
    const catalog = response.data.split(',')

    for (let i = 0; i < catalog.length; i++) {
        const item = pb.primary_navItem_factory(catalog[i])

        item.addEventListener('click', function () {
            document.getElementsByClassName('maintitle')[0].innerHTML = catalog[i] === 'Home' ? 'About Me' : catalog[i]

            document.getElementById('primary_content').innerHTML = ''

            const content = enes_event_listener(catalog[i])

            if (typeof content === 'string') {
                window.location.href = `../${content}.html`
            } else {
                // Make a Fake URL
                // const base_url = window.location.href.split('?')[0]
                // window.history.pushState({}, 0, base_url + '?page=' + catalog[i].toLowerCase().replace(' ', '_'))

                // Make a Fake URL By Helper
                const base_url = window.location.href.split('?')[0]
                fake_url = base_url + '?page=' + catalog[i].toLowerCase().replace(' ', '_')
            }

            content.forEach(element => { primary_content.appendChild(element) })

            // add imageviewer event to the images that need to be zoom-in
            const zoom_in_imgs = document.getElementsByClassName('zoom_in_img')
            for (let i = 0; i < zoom_in_imgs.length; i++) {
                console.log('event added')
                zoom_in_imgs[i].addEventListener('click', () => {
                    cover.style.display = 'block'

                    imageViewer.style.display = 'block'
                    imageViewer.changeImgSrc(zoom_in_imgs[i].src)
                })
            }

            primary_content.appendChild(footer_content)
        })

        primary_nav.appendChild(item)
    }

    body_content.appendChild(primary_nav)

    main.appendChild(primary_content)
    body_content.appendChild(main)

    // handle the parameter of url
    const parameters = window.location.search.split('=')
    if (parameters.length > 1 && parameters[0] === '?page') {
        const path = parameters[1]
        const path_for_event = path.split('_').map(element => {
            return element.replace(/^\S/g, s => s.toUpperCase())
        }).join(' ')
        document.getElementsByClassName('maintitle')[0].innerHTML = path_for_event === 'Home' ? 'About Me' : path_for_event
        fake_url = window.location.href
        const page = enes_event_listener(path_for_event)
        if (typeof page === 'string') {
            window.location.href = `../${page}.html`
        } else {
            page.forEach(page_content => {
                primary_content.appendChild(page_content)
            })
            primary_content.appendChild(footer_content)
        }

    } else {
        const page = enes_event_listener('Home')
        fake_url = window.location.href
        page.forEach(page_content => {
            primary_content.appendChild(page_content)
        })
        primary_content.appendChild(footer_content)
    }

    // add imageviewer event to the images that need to be zoom-in
    const zoom_in_imgs = document.getElementsByClassName('zoom_in_img')
    for (let i = 0; i < zoom_in_imgs.length; i++) {
        zoom_in_imgs[i].addEventListener('click', () => {
            cover.style.display = 'block'

            imageViewer.style.display = 'block'
            imageViewer.changeImgSrc(zoom_in_imgs[i].src)
        })
    }

})