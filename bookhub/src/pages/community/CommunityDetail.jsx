import CommunityForm from "./CommunityForm.jsx";
import State from "../../component/community/State.jsx";
import FooterButton from "../../component/button/FooterButton.jsx";
import Modal from "../../component/modal/Modal.jsx";
import Wrapper from "../../component/layout/Wrapper.jsx";
import useCommunityDetail from "../../component/hooks/useCommunityDetail.js";

const CommunityDetail = () => {
  const {
    communityData,
    pictureUrl,
    isBookmarked,
    isAuthor,
    isEditing,
    editedTitle,
    editedContent,
    showDeleteModal,
    showEditModal,
    showCancelEditModal,
    animating,
    setEditedTitle,
    setEditedContent,
    setShowDeleteModal,
    setShowEditModal,
    setIsEditing,
    onClickBookmark,
    onClickConfirmEdit,
    onClickDelete,
    handleConfirmCancelEdit,
    handleCancelCancelEdit,
  } = useCommunityDetail();

  if (!communityData) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <State type={isEditing ? "edit" : communityData ? "post" : "write"} $isPostAuthor={isAuthor} />

      <FooterButton
        status={isEditing ? "edit" : isAuthor ? "mypost" : "other"}
        isBookmarked={isBookmarked}
        onClickEdit={() => setIsEditing(true)}
        onClickDelete={() => setShowDeleteModal(true)}
        onClickDone={() => setShowEditModal(true)}
      />

      {isEditing ? (
        <Wrapper key="edit">
          <CommunityForm
            mode="edit"
            title={editedTitle}
            content={editedContent}
            onChangeTitle={(e) => setEditedTitle(e.target.value)}
            onChangeContent={(e) => setEditedContent(e.target.value)}
            pictureUrl={pictureUrl}
          />
        </Wrapper>
      ) : (
        <Wrapper key="read">
          <CommunityForm
            mode="read"
            title={communityData.title}
            content={communityData.content}
            writer={communityData.nickname}
            createdat={communityData.createdat}
            onClickBookmark={onClickBookmark}
            isBookmarked={isBookmarked}
            animating={animating}
            pictureUrl={pictureUrl}
          />
        </Wrapper>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          title="삭제하시겠습니까?"
          content={
            <>
              삭제하면 해당 게시글은 <br />
              되돌릴 수 없습니다.
            </>
          }
          onClose={onClickDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* 수정 확인 모달 */}
      {showEditModal && (
        <Modal
          title="수정하시겠습니까?"
          content={<>확인을 누르면 게시글이 수정됩니다.</>}
          onClose={onClickConfirmEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {/* 수정 취소 확인 모달 */}
      {showCancelEditModal && (
        <Modal
          title="수정을 취소하시겠습니까?"
          content="취소하면 변경사항이 저장되지 않습니다."
          onClose={handleConfirmCancelEdit}
          onCancel={handleCancelCancelEdit}
        />
      )}
    </>
  );
};

export default CommunityDetail;
