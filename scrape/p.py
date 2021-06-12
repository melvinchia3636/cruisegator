from bs4 import BeautifulSoup as bs
import json

table = {
	'': True,
	'-': False
}

scrapeship = lambda: (s := bs(open('hmm.txt', 'r').read(), 'lxml')) and json.dump(json.load(open('data.json', 'r')) | {s.select('.info-media__title')[0].text.split(',')[0].title(): {
	
	'service_info': dict([[table[i.text] if i.text in table else int(i.text) if i.text.isdigit() else i.text for i in i.select('span')] for i in  s.select('.js-content-tabs')[1].select('.ship-details__detail')]),

	'interesting_fact': dict([[i.select('.ship-details__title')[0].text, dict([[table[i.text] if i.text in table else int(i.text) if i.text.isdigit() else i.text for i in i.select('span')] for i in i.select('.ship-details__detail-multiple')])] for i in s.select('.js-content-tabs:nth-child(3) .ship-details__details-multiple-group')])
}}, open('data.json', 'w'))

scrapeships = lambda: print(json.dumps([i['href'] for i in bs(open('hmm.txt', 'r', encoding='utf-8').read(), 'lxml').select('.ship-card-gallery__content')], indent=4))

scrapeships()