import {
    get_homepage_details_asyncxhr, get_biography_details_asyncxhr,
    get_publications_details_asyncxhr, get_activities_details_asyncxhr,
    get_invitedtalk_details_asyncxhr, get_teaching_details_asyncxhr,
    get_awards_details_asyncxhr
} from '../util/request'

import * as pb from '../util/pagebuilder'

import new_label from '../asset/new.gif'

export function enes_event_listener(event_name) {
    if (event_name === 'Home') {
        const request = get_homepage_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            // Set personal info
            const personal_info = pb.div_factory('personal_info')

            const name = pb.strong_factory(data.name)
            name.style.fontSize = '1.2em'
            personal_info.appendChild(name)

            // change title content on the top of page
            const name_length = data.name.indexOf('(')
            if (name_length !== -1) {
                const name_en = data.name.substr(0, name_length - 1)
                document.getElementsByClassName('title')[0].innerText = 'Welcome to ' + name_en + "'s Website"
            }

            if (data.remarks) {
                data.remarks.forEach(remark => {
                    personal_info.appendChild(pb.paragraph_factory(remark, ''))
                })
            }
            if (data.titles) {
                data.titles.forEach(title => {
                    personal_info.appendChild(pb.paragraph_factory(title, ''))
                })
            }

            personal_info.appendChild(pb.paragraph_factory(data.department, ''))
            personal_info.appendChild(pb.paragraph_factory(data.belonging, ''))

            personal_info.appendChild(pb.paragraph_factory('Education:', 'subtitle'))
            data.education.forEach(education => {
                const p = document.createElement('p')
                p.innerText = education.content

                const a = document.createElement('a')
                a.href = education.link

                const img = document.createElement('img')
                img.src = './data/image/' + education.logo
                img.style.width = '20px'
                img.style.verticalAlign = 'middle'

                a.appendChild(img)
                p.appendChild(a)

                p.style.lineHeight = '21px'
                p.style.marginLeft = '3px'

                personal_info.appendChild(p)
            })

            // Set personal photo
            const photo = pb.image_factory_by_id('./data/image/' + data.photo, 'photo')

            // Combine personal info and personal photo
            const person_content = pb.div_factory('personal_content')
            person_content.appendChild(personal_info)
            person_content.appendChild(photo)

            // Set greeting and message
            person_content.appendChild(pb.paragraph_factory('Message:', 'subtitle'))

            data.messages.forEach(msg => {
                person_content.appendChild(pb.paragraph_factory(msg, 'message_content'))
            })

            page_content.push(person_content)

            // Set personal news
            const person_news = pb.div_factory('personal_news')

            person_news.appendChild(pb.paragraph_factory('What\`s New:', 'subtitle'))

            data.news.forEach(news_content => {
                const p = document.createElement('p')

                if (news_content.type === 'new') {
                    const img = document.createElement('img')
                    img.src = new_label
                    img.style.height = '20px'
                    img.style.verticalAlign = 'middle'
                    img.style.marginRight = '5px'

                    p.appendChild(img)
                }

                p.innerHTML += news_content.content

                person_news.appendChild(p)

                if (news_content.images) {
                    news_content.images.forEach(image => {
                        const img = document.createElement('img')

                        img.src = './data/image/' + image
                        img.style.width = '96%'
                        img.style.marginLeft = '2%'

                        person_news.appendChild(img)
                    })
                }
            })

            page_content.push(person_news)

            return page_content
        }
    }
    if (event_name === 'Biography') {
        const request = get_biography_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            page_content.push(pb.paragraph_factory(data.intro, 'bio_intro'))

            data.experiences.forEach(exp => {
                const exp_div = pb.div_factory("bio_exp")

                const logo = document.createElement('img')
                logo.src = './data/image/' + exp.logo
                logo.className = 'bio_exp_logo'
                exp_div.appendChild(logo)

                const exp_detail_div = pb.div_factory("bio_exp_details")
                exp_detail_div.appendChild(pb.paragraph_factory(exp.title + ', ' + exp.time, ''))
                if (exp.department) {
                    exp_detail_div.appendChild(pb.paragraph_factory(exp.department, ''))
                }
                exp_detail_div.appendChild(pb.paragraph_factory(exp.belonging))
                exp_detail_div.appendChild(pb.paragraph_factory(exp.address))
                exp_div.appendChild(exp_detail_div)

                page_content.push(exp_div)
            })

            return page_content
        }
    }
    else if (event_name === 'Publications') {
        const request = get_publications_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const title = pb.paragraph_factory(element.name, 'list_title')
                page_content.push(title)

                const ol = pb.ol_factory('list pubs_list')
                element.content.forEach(item => {
                    ol.appendChild(pb.li_factory(`${item.author}, <a href=
                    ${item.link ? item.link : ''}>"${item.title}"</a>, <em>${item.medium}</em>, ${item.remark}${item.award ? ', ' : ''} <font color="red">
                    ${item.award ? item.award : ''}</font>`, 'item'))
                })
                page_content.push(ol)
            })

            return page_content
        }
    }
    else if (event_name === 'Professional Activities') {
        const request = get_activities_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const title = pb.paragraph_factory(element.name, 'list_title')
                page_content.push(title)

                const ul = pb.ul_factory('list')
                element.content.forEach(item => {
                    ul.appendChild(pb.li_factory(item, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
    else if (event_name === 'Invited Talk') {
        const request = get_invitedtalk_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const ul = pb.ul_factory('invitedtalk_list')

            data.list.forEach(element => {
                const li = pb.li_factory(element.time + ` <a href="${element.link}" 
                style="color: #72af2c">${element.content}</a>`, 'item')

                if (element.title) {
                    li.appendChild(pb.paragraph_factory(`Title: ${element.title}`))
                }
                if (element.img) {
                    const img = document.createElement('img')
                    img.src = './data/image/' + element.img
                    img.style.width = "100%"
                    li.appendChild(img)
                }

                ul.appendChild(li)
            })

            const page_content = []

            page_content.push(pb.paragraph_factory('', 'list_title'))

            page_content.push(ul)

            return page_content
        }

    }
    else if (event_name === 'Supervision') {
        return 'People'
    }
    else if (event_name === 'Teaching') {
        const request = get_teaching_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const year = pb.paragraph_factory(element.year, 'list_title')
                page_content.push(year)

                const ul = pb.ul_factory('list')
                element.list.forEach(item => {
                    ul.appendChild(pb.li_factory(item, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
    else if (event_name === 'Grants') {

    }
    else if (event_name === 'Awards') {
        const request = get_awards_details_asyncxhr()
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            page_content.push(pb.paragraph_factory('', 'list_title'))

            data.catagory.forEach(element => {
                if (element.name) {
                    const title = pb.paragraph_factory(element.name, 'list_title')
                    page_content.push(title)
                }

                const ul = pb.ul_factory('list')
                element.content.forEach(item => {
                    ul.appendChild(pb.li_factory(`${item.name}, <em>${item.org}</em>, ${item.year}`, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
}