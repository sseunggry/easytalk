/* common */
$(function () {
    const uiCommon = {
        init: () => {
            uiCommon.resize();
            
            uiCommon.selectBox();
            uiCommon.btnBottomFixed();
            uiCommon.topBannerFixed();
        },
        resize: () => {
            $(window).resize(() => {
                uiCommon.topBannerFixed();
            });
        },
        selectBox: () => {
            $('.select').each((idx, el) => {
                const $wrapper = $(el);
                const $select = $wrapper.find('select');
                const options = $select.find('option');
                const placeholder = $select.find('.placeholder').text() || "선택하세요";

                if(!$wrapper.length) return;
                
                let html = `
                    <div class="ui-select" role="combobox" aria-haspopup="listbox" aria-expanded="false" tabindex="0">
                        <p class="value-txt placeholder">${placeholder}</p>
                        <ul class="option-list" role="listbox">
                `;

                options.each((idx, el) => {
                    const value = $(el).val();
                    const text = $(el).text();

                    console.log($(el).attr('checked'));

                    if($(el).hasClass('placeholder')) return;
                    html += `<li class="option" role="option" tabindex="0" data-value="${value}">${text}</li>`
                });

                html += `</ul></div>`;
                $wrapper.append(html);
                
                const $uiSelect = $wrapper.find('.ui-select');
                const $value = $uiSelect.find('.value-txt');
                const $list = $uiSelect.find('.option-list');
                const $items = $list.find('.option');

                $uiSelect.on('click', function (e) {
                    e.stopPropagation();
                    toggleOptions();
                });

                $items.on('click', function (e) {
                    e.stopPropagation();
                    selectOption($(this));
                    setTimeout(() => {
                        closeOptions();
                    }, 100);
                });

                $(document).on('click', function (e) {
                    if (!$(e.target).closest('.select').length) {
                        closeOptions();
                    }
                });

                // 키보드 접근성
                $wrapper.on('keydown', function (e) {
                    keyboardClick();
                });

                // <select> 변경 시 UI 반영
                $select.on('change', function () {
                    const selectedVal = $(this).val();
                    const $matched = $items.filter(`[data-value="${selectedVal}"]`);
                    if ($matched.length) {
                        $value.text($matched.text()).removeClass('placeholder');
                        $items.attr('aria-selected', 'false');
                        $matched.attr('aria-selected', 'true');
                    }
                });

                function toggleOptions() {
                    const isOpen = $uiSelect.attr('aria-expanded') === 'true' ? true : false;
                    $uiSelect.attr('aria-expanded', !isOpen);
                    $select.attr('aria-expanded', !isOpen);
                }

                function closeOptions() {
                    $select.attr('aria-expanded', 'false');
                    $uiSelect.attr('aria-expanded', 'false');
                }

                function selectOption($option) {
                    const value = $option.data('value');
                    const label = $option.text();

                    $value.text(label).removeClass('placeholder');
                    $select.val(value).trigger('change');

                    $items.attr('aria-selected', 'false');
                    $option.attr('aria-selected', 'true');
                }

                // 키보드 접근성
                function keyboardClick(e) {
                    const $focused = $(':focus');
                    const currentIndex = $items.index($focused);

                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (!$itemsList.hasClass('open')) toggleOptions();
                        const $next = $items.eq((currentIndex + 1) % $items.length);
                        $next.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (!$itemsList.hasClass('open')) toggleOptions();
                        const $prev = $items.eq((currentIndex - 1 + $items.length) % $items.length);
                        $prev.focus();
                    } else if (e.key === 'Enter') {
                        if ($focused.hasClass('option')) {
                            selectOption($focused);
                        } else {
                            toggleOptions();
                        }
                    } else if (e.key === 'Escape') {
                        closeOptions();
                    }
                }
            });
        },
        btnBottomFixed: () => {
            if($('.btn-fixed').length){
                $('.btn-fixed').each((idx, el) => {
                    const fixedHeight = $(el).innerHeight();
                    const contents = $(el).parents('.contents');
    
                    contents.css('padding-bottom', `${fixedHeight * 0.1}rem`);
                });
            }

        },
        topBannerFixed: () => {
            if($('.fixed-top-banner').length){
                const topBanner = $('.fixed-top-banner').innerHeight();
                const header = $('.header');
    
                header.css('top', topBanner * 0.1 + 'rem');
            }
        },
    }

    uiCommon.init();

    $('.select').each((idx, el) => {
        $(el).find('select').on('change', (e) => {
            // console.log($(e.target), e.target.value);
        });
    });
});