import './style.css'

import Logo from './asset/muit_logo.png'

import * as pb from './util/pagebuilder'

import { get_individual_catalog } from './util/request'

import { enes_event_listener } from './util/event_listener'

// Set up header
const header = pb.header_factory()

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

header.appendChild(logo)

header.appendChild(title)

document.body.appendChild(header)

// handle parameters from url

const primary_nav = pb.primary_nav_factory()

const primary_content = pb.primary_content_factory()

primary_content.appendChild(pb.paragraph_factory('Home', 'maintitle'))

const catalog_request = get_individual_catalog()

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
        })

        primary_nav.appendChild(item)
    }

    document.body.appendChild(primary_nav)

    document.body.appendChild(primary_content)
})