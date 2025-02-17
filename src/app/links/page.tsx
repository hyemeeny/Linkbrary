import { cookies } from "next/headers";
import { FolderType } from "@/types/folders";
import API_URL from "@/constants/config";
import LinkInput from "@/components/Input/LinkInput";
import LinksForm from "@/components/Links/LinksForm";

// 폴더 목록 가져오기
const getAllFolders = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("전체 폴더 조회 중 에러 발생", error);
    return [];
  }
};

interface getAllLinksParams {
  page: number;
  pageSize: number;
  search: string;
}

// 전체 링크 가져오기
const getAllLinks = async ({ page, pageSize, search }: getAllLinksParams) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/links?page=${page}&pageSize=${pageSize}&search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return {
      totalCount: data?.totalCount || 0,
      list: data?.list || [],
    };
  } catch (error) {
    console.error("전체 링크 조회 중 에러 발생", error);
    return { totalCount: 0, list: [] };
  }
};

interface getLinksByIdParams {
  page: number;
  pageSize: number;
  folderId: number;
}

// 폴더별 링크 가져오기
const getLinksById = async ({ page, pageSize, folderId }: getLinksByIdParams) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}/links?page=${page}&pageSize=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return {
      totalCount: data?.totalCount || 0,
      list: data?.list || [],
    };
  } catch (error) {
    console.error("링크 조회 중 에러 발생", error);
    return { totalCount: 0, list: [] };
  }
};

interface LinksPageProps {
  page: number;
  pageSize: number;
  search: string;
}

const LinksPage = async ({ page = 1, pageSize = 20, search = "" }: LinksPageProps) => {
  const [folders, links] = await Promise.all([getAllFolders(), getAllLinks({ page, pageSize, search })]);

  // 폴더 ID마다 링크 가져오기
  const folderLinksPromises = folders.map(async (folder: FolderType) => {
    const { totalCount, list } = await getLinksById({
      page,
      pageSize,
      folderId: folder.id,
    });
    return {
      folder,
      links: { totalCount, list },
    };
  });

  const folderLinks = await Promise.all(folderLinksPromises);

  return (
    <section>
      <LinkInput folders={folders} />
      <LinksForm folders={folders} links={links} folderLinks={folderLinks} />
    </section>
  );
};

export default LinksPage;
