import axios from 'axios'

export function get_catalog() {
    const request = axios({
        url: './data/catalog.csv'
    })

    return request
}

export function get_footer_info() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/info.csv', false)

    return request
}

export function get_homepage_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/home.json', false)

    return request
}

export function get_biography_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/biography.json', false)

    return request
}

export function get_publications_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/publications.json', false)

    return request
}

export function get_activities_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/activities.json', false)

    return request
}

export function get_invitedtalk_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/invitedtalk.json', false)

    return request
}

export function get_teaching_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/teaching.json', false)

    return request
}

export function get_grants_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/grants.json', false)

    return request
}

export function get_awards_details_asyncxhr() {
    const request = new XMLHttpRequest()
    request.open('GET', './data/content/awards.json', false)

    return request
}