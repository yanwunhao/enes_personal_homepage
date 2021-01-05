import './style.css'

import Logo from './asset/muit_logo.png'
import Logo_Footer from './asset/muit_logo_footer.png'

import * as pb from './util/pagebuilder'

import { get_catalog, get_footer_info } from './util/request'

import { enes_event_listener } from './util/event_listener'

// Set up header
const header = pb.header_factory()

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

header.appendChild(logo)

header.appendChild(title)

document.body.appendChild(header)

// Set aside navlist
const primary_nav = pb.primary_nav_factory()

const primary_content = pb.primary_content_factory()

primary_content.appendChild(pb.paragraph_factory('Home', 'maintitle'))

// Set footer info
const footer_content = pb.footer_content_factory()

const footer_request = get_footer_info()

footer_request.send(null)

if (footer_request.status === 200) {
    const datalist = footer_request.responseText.split('\r\n')

    const data = datalist[1].split(',')

    footer_content.appendChild(pb.paragraph_factory(data[0], ''))
    footer_content.appendChild(pb.paragraph_factory(data[1], ''))
    footer_content.appendChild(pb.paragraph_factory(data[2], ''))

    footer_content.appendChild(pb.paragraph_factory('Email: ' + data[3], ''))
    footer_content.appendChild(pb.paragraph_factory('Tel: ' + data[4], ''))
    footer_content.appendChild(pb.paragraph_factory('Fax: ' + data[5], ''))

    const footer_logo = new Image()

    footer_logo.src = Logo_Footer

    footer_logo.id = "footer_logo"

    footer_content.appendChild(footer_logo)
}

const catalog_request = get_catalog()

catalog_request.then(response => {
    const catalog = response.data.split(',')

    for (let i = 0; i < catalog.length; i++) {
        const item = pb.primary_navItem_factory(catalog[i])

        item.addEventListener('click', function () {
            document.getElementsByClassName('maintitle')[0].innerHTML = catalog[i]

            document.getElementById('primary_content').innerHTML = ''
            primary_content.appendChild(pb.paragraph_factory(catalog[i], 'maintitle'))

            const content = enes_event_listener(catalog[i])

            if (typeof content === 'string') {
                window.location.href = `../${content}.html`
            }

            content.forEach(element => { primary_content.appendChild(element) })

            primary_content.appendChild(footer_content)
        })

        primary_nav.appendChild(item)
    }

    document.body.appendChild(primary_nav)

    primary_content.appendChild(footer_content)

    document.body.appendChild(primary_content)
})