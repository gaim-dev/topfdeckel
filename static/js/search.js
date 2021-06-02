var search = instantsearch({
    searchClient: new TypesenseInstantsearchAdapter({
        server: {
            apiKey: 'egLHeOzn9OAikM8pAhcmHntIqnxsvcjb',
            nodes: [
                {
                    host: 'search.gabriele-altpeter.info',
                    port: '443',
                    protocol: 'https',
                },
            ],
        },
        additionalSearchParameters: {
            queryBy: 'title,description,tags,categories',
            queryByWeights: '10,8,3,3',
            exclude_fields: 'author,categories,content,date,id',
        },
    }).searchClient,
    indexName: 'kochfokus-posts',
    routing: {
        stateMapping: {
            stateToRoute: function (uiState) {
                return { q: uiState['kochfokus-posts'].query };
            },
            routeToState: function (routeState) {
                return { 'kochfokus-posts': { query: routeState.q } };
            },
        },
    },
});
search.addWidgets([
    instantsearch.widgets.configure({ hitsPerPage: 50 }),
    instantsearch.widgets.searchBox({
        container: '#aa-search-input',
        placeholder: 'Suchen…',
        cssClasses: {
            input: ['input'],
        },
        autofocus: true,
        showReset: false,
        showSubmit: false,
        showLoadingIndicator: false,
    }),
    instantsearch.widgets.infiniteHits({
        container: '#hits',
        templates: {
            item: '<a href="{{url}}">\
                       {{#image}}<img class="aa-suggestion-image" src="{{image}}">{{/image}}\
                       <p class="aa-suggestion-title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</p>\
                       {{#description}}<p class="aa-suggestion-excerpt">{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>{{/description}}\
                   </a><div class="clearfix"></div>',
            empty: 'Leider keine Ergebnisse für <em>„{{query}}“</em> gefunden.',
        },
        cssClasses: {
            loadMore: ['button'],
        },
        showMoreLabel: 'Weitere Ergebnisse laden',
    }),
]);
search.start();
