<template>
    <nav class id="navMenu">
        <div id="navMenuTitle">
            <span>系統名稱</span>
            <svg
                version="1.1"
                id="icon-RighLeft"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 9 16"
                style="enable-background:new 0 0 9 16;"
                xml:space="preserve"
            >
                <path
                    id="Path"
                    class="st0"
                    d="M8.8,0.2c0.3,0.3,0.3,0.7,0,1L2.1,7.7C2,7.8,1.9,7.9,1.9,8l0,0c0,0.1,0.1,0.3,0.1,0.3l6.7,6.5
               C8.9,15,9,15.1,9,15.3c0,0.2-0.1,0.3-0.2,0.5c-0.3,0.3-0.7,0.3-1,0L0.2,8.5C0.1,8.3,0,8.2,0,8c0-0.2,0.1-0.3,0.2-0.5c0,0,0,0,0,0
               l7.6-7.3C8.1-0.1,8.5-0.1,8.8,0.2z"
                />
            </svg>
        </div>
        <div id="navTab">
            <ul>
                <li class="active">功能清單</li>
                <li>我的最愛</li>
                <li>流程精靈</li>
            </ul>
        </div>
        <div id="navMenuSearchbar">
            <div class="inputWrap">
                <input placeholder="請依功能名稱或功能代號搜尋" type="text" />
                <svg
                    version="1.1"
                    id="magnifier"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    style="enable-background:new 0 0 24 24;"
                    xml:space="preserve"
                >
                    <path
                        d="M20.3,19.1l-3.4-3.4c1.1-1.3,1.6-3,1.6-4.7c0-4.1-3.4-7.5-7.5-7.5S3.5,6.9,3.5,11s3.4,7.5,7.5,7.5
                   c1.7,0,3.4-0.6,4.7-1.6l3.4,3.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.4-0.1,0.6-0.2C20.6,19.9,20.6,19.4,20.3,19.1z M11,16.8
                   c-3.2,0-5.8-2.6-5.8-5.8S7.8,5.2,11,5.2s5.8,2.6,5.8,5.8S14.2,16.8,11,16.8z"
                    />
                </svg>
            </div>
        </div>
        <div id="menuGroups">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <ul>
                <li>4</li>
                <li>5</li>
                <li>6</li>
            </ul>
            <ul>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
        </div>
    </nav>
</template>
<style lang="scss" scoped>
/******************************************************* frame Layout ******************************************************/
body {
    background-color: #1f2532;
}
#frame {
    width: 100%;
    background-color: #1f2532;
    display: flex;
    justify-content: flex-start;
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: 1px;
    color: #ffffff;
}

svg {
    width: 32px;
    height: 32px;
    fill: #ffffff;
}

#frameRight {
    position: relative;
    width: calc(100% - 320px);
    background-color: #1f2532;
    padding-bottom: 70px;
    transition: width ease 0.3s;
}
</style>