import { apiAuth } from 'api';
import Swal from 'sweetalert2';

async function postAffiliateInstitute(id, cb) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You wanted to Affiliate this Institute',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await apiAuth.post(`admin/institute-affiliate/${id}`);
        if (res.status == 200) {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
          });
          cb();
        }
      } catch (error) {
        Swal.fire({
          width: 400,
          title: error?.response?.data?.message ? error?.response?.data?.message : 'Something Went Wrong Check  your Network Connection',
          icon: 'error',
        });
      }
    }
  });
}
async function deleteAffiliateInstitute(id, cd) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You wanted to remove this institute!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await apiAuth.delete('admin/institute-affiliate?id=' + id);
        if (res.status == 200) {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
          });
          cd();
        }
      } catch (error) {
        Swal.fire({
          width: 400,
          title: error?.response?.data?.message ? error?.response?.data?.message : 'Something Went Wrong Check  your Network Connection',
          icon: 'error',
        });
      }
    }
  });
}

export { postAffiliateInstitute, deleteAffiliateInstitute };
