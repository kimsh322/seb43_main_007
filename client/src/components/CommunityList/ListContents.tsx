import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ListContent from "./ListContent";
import Pagination from "./Pagination";
import type { PageInfo, ListData } from "./listTypes";
import { listData } from "../../api/axios";
import { RootState } from "../../store/store";
import ListSearch from "./ListSearch";
// import data from "./dumyData";

function ListContents() {
   // useParms사용하여 값을 가져와서 api에 넣어준다.
   // 라우팅페이지 파람 설정(/:파람) => Link to path걸어줄때 원하는 파람넣어주기(/파람) => 필요한 곳에서 useParams()값 가져오기
   const { cate } = useParams();

   // api로 가져온 데이터들
   const [datas, setDatas] = useState<ListData[]>([]);
   const [pageInfo, setPageInfo] = useState<PageInfo>();

   // // 페이지 네이션 필요한 상태 변수들
   const [curPage, setCurPage] = useState(1); // 현재 페이지
   const totalPage = pageInfo?.totalPages; // 전체 페이지
   const limit = 5; // 한화면 페이지 보일 수 페이지 5개 보임

   // 멤버 아이디 리덕스에서 가져오기
   // 비회원 일때는 멤버 아이디 0으로 => 로그인 되면 그 회원 아이디로 바뀌는 로직이다.(로그인에서 처리해줌)
   const memberId = useSelector((state: RootState) => state.memberId);

   // list목록페이지 데이터 get요청
   const listDatas = async () => {
      if (cate === undefined) {
         const data = await listData(curPage, `/${memberId}`, ``);
         setDatas(data.data);
         setPageInfo(data.pageInfo);
      } else {
         const data = await listData(curPage, `/${memberId}`, `&cate=${cate}`);
         setDatas(data.data);
         setPageInfo(data.pageInfo);
      }
   };

   useEffect(() => {
      listDatas();
   }, [curPage, cate]);

   return (
      <DivContainer>
         <ListSearch setDatas={setDatas} setPageInfo={setPageInfo} />
         <div>
            <ul>
               {datas.map((el: ListData) => (
                  <ListContent key={el.boardId} userDatas={el} />
               ))}
            </ul>
         </div>
         <DivPagination>
            {totalPage && (
               <Pagination
                  totalPage={totalPage}
                  limit={limit}
                  curPage={curPage}
                  setCurPage={setCurPage}
               />
            )}
         </DivPagination>
      </DivContainer>
   );
}

const DivContainer = styled.div`
   /* border: 1px solid green; */
   width: 1050px;
   margin-left: 30px;

   > div > ul {
      padding: 0px;
   }
`;

const DivPagination = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
`;

export default ListContents;
