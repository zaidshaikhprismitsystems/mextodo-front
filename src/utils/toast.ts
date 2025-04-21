import { toast, Bounce } from "react-toastify";

class Toast {
  static showSuccessMessage(message: string) {
    toast(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
  }

  static showErrorMessage(message: string) {
    toast(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
        transition: Bounce,
    });
  }

  static showConfirmation (message: any){
      toast( message, { autoClose: false, closeOnClick: false });
    };

//   static async showWarningMessage(message: string) {
//     return await Swal.fire({
//       title: message,
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       denyButtonText: `No`,
//     });
//   }

//   static async showSiteURLMessage(message: string) {
//     return await Swal.fire({
//       title: message,
//       confirmButtonText: "Done",
//       focusConfirm: false,
//       showDenyButton: true,
//       denyButtonText: "Edit",
//       confirmButtonColor: "#126e83",
//       denyButtonColor: "#d8e3e7"
//     });
//   }

//   static scrollToView(id: string, offsetValue?: number) {
//     if (typeof window !== "undefined") {
//       const element: any = document.getElementById(id);
//       if (element) {
//         window.scrollTo({
//           top: element.offsetTop ? element.offsetTop - (offsetValue || 204) : 0,
//           behavior: "smooth",
//         });
//       }
//     }
//   }

//   static setItem(key: string, data: any) {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(key, JSON.stringify(data));
//     }

//     return null;
//   }

//   static getItem(key: string) {
//     if (typeof window !== "undefined") {
//       let keyData = localStorage.getItem(key);
//       return keyData;
//     }
//     return null;
//   }

//   static clearStorage() {
//     if (typeof window !== "undefined") {
//       localStorage.clear();
//     }
//   }

//   static capitalizeFirstLetter(string: string | null) {
//     if (string) {
//       return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     return null;
//   }

//   static getAMPMTime(one: any, two: any) {
//     const outputFormat = "h:mm:ss a";
//     return `${format(new Date(`2000-01-01T${one}`), outputFormat)} - ${format(
//       new Date(`2000-01-01T${two}`),
//       outputFormat
//     )}`;
//   }

//   static getTotalPages(data: any, itemPerPage: number) {
//     return Math.ceil(data.length / itemPerPage);
//   }

//   static removeItem(name: string) {
//     localStorage.removeItem(name);
//   }

//   static generatePageSlug(name: string) {
//     let slug = name.replace(/[^a-zA-Z ]/g, "");
//     if (slug) {
//       let company_slug = slug
//         ?.replace(" ", "-")
//         .replace(/\s+/g, "")
//         .toLowerCase();

//       return company_slug;
//     }

//     return null;
//   }

//   static getWorkingHours(timeString: string) {
//     if (timeString) {
//       const parsedTime = parse(timeString, "HH:mm:ss", new Date());
//       if (parsedTime) {
//         return format(parsedTime, "h:mm a");
//       }
//     } else {
//       return "N/A";
//     }
//   }

//   static getYear(date: string) {
//     if (date) {
//       if (format(new Date(date), "yyyy")) {
//         return format(new Date(date), "yyyy");
//       }
//     } else {
//       return "N/A";
//     }
//   }

//   static getPageSlug() {
//     const { siteSlug } = this.userState();
//     if (siteSlug) {
//       return siteSlug;
//     } else {
//       return null;
//     }
//   }


//   static getCompanyID() {
//     const { companyId } = this.userState();
//     if (companyId) {
//       return companyId;
//     } else {
//       return null;
//     }
//   }


//   static getUserID() {
//     const { userDetails } = this.userState();
//     if (userDetails.userId) {
//       return userDetails.userId;
//     } else {
//       return null;
//     }
//   }

//   static getMondayToSundayDateTime(
//     working_hours_from: string,
//     working_hours_to: string
//   ): string {
//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     const workingHoursFrom = parse(working_hours_from, "HH:mm:ss", new Date());
//     const workingHoursTo = parse(working_hours_to, "HH:mm:ss", new Date());

//     const formattedWorkingHours = `${daysOfWeek[1]} - ${daysOfWeek[6]
//       } Day: ${format(workingHoursFrom, "hh.mm")} to ${format(
//         workingHoursTo,
//         "hh.mm"
//       )} - ${daysOfWeek[0]} Closed`;

//     return formattedWorkingHours;
//   }

//   static getContent(data?: any) {
//     return data ? data : "N/A";
//   }

//   static getCompressContent(data: string) {
//     const result = data;
//     if (result && result.length >= 45) {
//       return `${result.slice(0, 45)}...`;
//     } else {
//       return result;
//     }
//   }

//   static checkIconForTheme(activeTheme: string) {
//     if (activeTheme && activeTheme !== null) {
//       let isTheme = SERVICE_ICONS_THEMES.map((item: any) => {
//         return item === activeTheme.toUpperCase();
//       })
//       return isTheme.includes(true) ? true : false
//     }
//     return false;
//   }

}

export default Toast;
