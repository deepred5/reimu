import cheerio from 'cheerio-without-node-native';

export default function statusParser(html) {
    let $ = cheerio.load(html);

    let blockquote = $('.sticky blockquote').text().trim();
    let content = '';
    let links = [];
    let imgs = [];

    $('.sticky .entry-content > p').each(function () {
        content += $(this).text().trim();
    });

    $('.sticky .entry-content a').each(function () {
        let url = $(this).attr('href').trim();
        let content = $(this).text().trim();
        links.push({url, content});

    });

    $('.sticky .entry-content img').each(function () {
        let uri = $(this).attr('src').trim();
        imgs.push(uri);
    });

    links.forEach(function (item) {
        content = content.replace(item.content, '');
    });

    return {
        blockquote,
        content,
        links,
        imgs
    };
}