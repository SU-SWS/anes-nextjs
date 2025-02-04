import {isPreviewMode} from "@lib/drupal/is-preview-mode"
import Editori11y from "@components/tools/editorially"
import EditorAlert from "@components/elements/editor-alert"

export const dynamic = "force-dynamic"

const Layout = async ({children}: {children: React.ReactNode}) => {
  const inPreview = await isPreviewMode()
  return (
    <>
      {inPreview && (
        <EditorAlert status={false} message="Preview Mode">
          <Editori11y />
        </EditorAlert>
      )}
      {children}
    </>
  )
}
export default Layout
