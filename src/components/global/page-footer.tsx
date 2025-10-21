import LocalFooter from "@components/config-pages/local-footer"
import SuperFooter from "@components/config-pages/super-footer"
import FacebookIcon from "@components/elements/icons/FacebookIcon"
import TwitterIcon from "@components/elements/icons/TwitterIcon"
import StanfordChildrensHealthLogo from "@components/images/stanford-childrens-health-logo"
import StanfordHealthCareLogo from "@components/images/stanford-health-care-logo"
import StanfordHealthCareTriValleyLogo from "@components/images/stanford-health-care-tri-valley-logo"
import StanfordMedicinePartnerLogo from "@components/images/stanford-medicine-partners-logo"
import StanfordMedicineSomLogo from "@components/images/stanford-medicine-som-logo"
import {HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLElement>

const PageFooter = ({...props}: Props) => {
  return (
    <footer {...props}>
      <SuperFooter />
      <LocalFooter />

      <div className="bg-black pb-50 font-sans text-white">
        <div className="centered mx-auto w-full xl:max-w-1130">
          <div className="text-16 flex flex-col justify-between gap-10 pt-24 pb-12 lg:flex-row lg:gap-50">
            <div className="shrink-0 font-semibold">
              ©<span>{new Date().getFullYear()}</span> Stanford University
            </div>

            <ul className="flex w-full max-w-550 flex-row flex-wrap items-center p-0 [&_a]:text-white [&_a]:no-underline [&_a:hocus]:text-white">
              <li className="mb-0 list-none pr-30">
                <a href="https://www.stanford.edu/site/privacy">Privacy Policy</a>
              </li>
              <li className="mb-0 pr-30">
                <a href="https://www.stanford.edu/site/terms">Terms of Use</a>
              </li>
              <li className="mb-0 pr-30">
                <a href="https://www.stanford.edu/site/accessibility">Accessibility</a>
              </li>
              <li className="mb-0 pr-10">
                <a href="https://bulletin.stanford.edu/academic-polices/student-conduct-rights/nondiscrimination">
                  Non-Discrimination
                </a>
              </li>
              <li className="mb-0 list-none">
                <a href="https://www.facebook.com/stanfordmedicine">
                  <span className="sr-only">See us on Facebook</span>
                  <FacebookIcon className="h-16 fill-white" />
                </a>
              </li>
              <li className="mb-0 list-none">
                <a href="https://twitter.com/stanfordmed">
                  <span className="sr-only">See us on X (Twitter)</span>
                  <TwitterIcon className="h-16 fill-white" />
                </a>
              </li>
            </ul>
          </div>
          <div className="mr-142 mb-18 w-314 max-lg:pt-30 lg:ml-auto lg:w-400 [&_a]:text-white [&_a]:underline [&_a:hocus]:text-white">
            <h4 className="text-21 leading-cozy mt-14 mb-0 font-sans">Non-Discrimination</h4>
            <p className="text-16 mb-0 font-semibold">
              Stanford complies with all applicable civil rights laws and does not engage in illegal preferences or
              discrimination.
            </p>
            <p className="text-16">
              <a href="https://bulletin.stanford.edu/academic-polices/student-conduct-rights/nondiscrimination">
                Stanford&apos;s Non-Discrimination Policy
              </a>
            </p>
          </div>

          <ul className="text-16 children:ml-0 m-0 mx-auto mt-40 flex max-w-1300 list-none flex-col justify-around p-0 max-lg:items-center max-lg:gap-30 lg:mt-36 lg:flex-row [&_a]:text-white [&_a]:no-underline [&_a:hocus]:text-white">
            <li>
              <a className="logo text-25 hocus:text-white text-white" href="https://www.stanford.edu">
                Stanford
                <br />
                University
              </a>
            </li>
            <li>
              <a href="//med.stanford.edu" title="Stanford School of Medicine">
                <StanfordMedicineSomLogo className="lg:h-45" height={55} />
              </a>
            </li>
            <li>
              <a href="http://stanfordhealthcare.org" title="Stanford Health Care">
                <StanfordHealthCareLogo className="lg:h-45" height={55} />
              </a>
            </li>
            <li>
              <a href="http://www.stanfordchildrens.org" title="Stanford Children's Health">
                <StanfordChildrensHealthLogo className="lg:h-45" height={55} />
              </a>
            </li>
            <li>
              <a href="http://ValleyCare.com" title="Stanford Health Care Tri-Valley">
                <StanfordHealthCareTriValleyLogo className="lg:h-70" height={80} />
              </a>
            </li>
            <li>
              <a href="http://universityhealthcarealliance.org" title="Stanford Medicine Partners">
                <StanfordMedicinePartnerLogo className="lg:h-45" height={55} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
export default PageFooter
