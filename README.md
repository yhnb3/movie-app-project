# 그립 기업 과제 개인 프로젝트

영화 검색 및 즐겨 찾기를 관리 할 수 있는 앱입니다.

### 개발 기간

2022.5.9 ~ 2022.5.14

#### 개발 인원

개인 프로젝트

#### SKILLS

- React
- typescript
- Recoil
- Scss

### 로컬에서 실행 방법

```
/// .env

REACT_APP_MOVIE_API_KEY=API키등록 ('' 없이 입력)
```

[키 발급 사이트](https://www.omdbapi.com/)에서 개인 API키를 발급 가능합니다.

```bash
npm i     
npm start
```


### 기능 구현

- 인피니티 스크롤

  #### 사용 라이브러리

  `react-intersection-observer`

  #### 구현 방법

  - Intersection Observer를 이용하여 구현
  - 검색하고자 하는 키워드의 총 검색결과와 현재 검색 결과를 비교하여 현재 검색 결과가 총 검색 결과 보다 적을 경우 검색 결과 아래에 Loading 컴포넌트를 붙힙니다.
  - Loading 컴포넌트를 observing 하고 싶은 엘리먼트로 설정하여 Loading 컴포넌트가 보여질때 마다 새로운 검색 결과를 불러오는 식으로 구현 하였습니다.

  #### 동작

  ![인피니티 스크롤](https://user-images.githubusercontent.com/60080270/168418273-5f3191eb-e630-40df-a53d-301b8e6247d1.gif)

- 드래그 앤 드랍

  #### 사용 라이브러리

  `dnd-kit`

  #### 구현 방법

  - 드래그 앤 드랍을 하고 싶은 가장 상위 컴포넌트를 `<DndContext />`로 감싼다.
  - 그리고 `<ul>`태그를 `<SortableContext />`로 감싸고
  - `<li>`태그를 `<SortableItem />`으로 감싼다.
  - 나는 stroll container에 적용하려 하였기에 `<DragOverlay>`를 사용하였으며 자동 적으로 어떤 아이템을 드래그 하였을때 그 아이템은 보이지 않도록 `opacity` 를 0으로 처리해 주었습니다.
  - 클릭과 드래그를 구분하기 위해 드래그 시에는 최소 8픽셀 이상의 움직임이 있을 경우 드래그로 인식하며 그 이하의 움직임은 클릭으로 인식 하도록 하였습니다.
  - 모바일 상에서 스크롤을 위한 드래그과 아이템을 옮기기 위한 드래그를 구분하기 위해 아이템을 옮기기 위한 드래그는 꾹 눌러야 하도록 delay를 주었습니다.

  #### 동작

  ![드래그앤드랍](https://user-images.githubusercontent.com/60080270/168418505-1304f95b-2945-4bfc-9e6a-84b4eb2461db.gif)
