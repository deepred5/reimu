import cheerio from 'cheerio-without-node-native';
import guid from '../utils/guid';

export default function articleParser(html) {
    let $ = cheerio.load(html);
    let articles = $('article').not('.sticky');
    let data = [];
    let last = null;

    if ($('.wp-pagenavi').has('a').length) {
        last = $('.wp-pagenavi a').last().attr('href').match(/(\d)+$/);
    }

    let totalPages = last ? last[0] : 1;


    articles.each(function () {
        let title = $(this).find('h2').text();
        let contents = $(this).find('.entry-content p');
        let summary = '';
        let author = $(this).find('.fn').text().trim();
        let time = $(this).find('.entry-date').text().trim();
        let imageUrl = '';
        let category = [];
        let tags = [];
        let id = $(this).find('[rel="bookmark"]').attr('href').match(/(\d)+/g)[0];
        let key = guid();
        $(this).find('[rel~="category"]').each(function () {
            category.push($(this).text().trim());
        });
        $(this).find('[rel="tag"]').each(function () {
            tags.push($(this).text().trim());
        });

        if ($(this).find('img').length) {
            imageUrl = $(this).find('img').attr('src');
        }

        contents.each(function () {
            let content = $(this).text().trim();
            summary += content;
        });

        summary = summary.slice(0, summary.indexOf('继续阅读')).trim();

        data.push({
                title,
                summary,
                author,
                time,
                imageUrl,
                category,
                tags,
                id,
                key
            }
        );
    });

    return {
        data,
        totalPages
    };
}